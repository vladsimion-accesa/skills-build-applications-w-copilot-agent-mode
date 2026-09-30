import mongoose from 'mongoose';
import { connectDatabase } from '../config/database';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await connectDatabase();

    const userData = [
      { displayName: 'Maya Chen', username: 'maya.chen', email: 'maya.chen@example.com' },
      { displayName: 'Jordan Lee', username: 'jordan.lee', email: 'jordan.lee@example.com' },
      { displayName: 'Sofia Ramirez', username: 'sofia.ramirez', email: 'sofia.ramirez@example.com' },
      { displayName: 'Ethan Brooks', username: 'ethan.brooks', email: 'ethan.brooks@example.com' },
    ];
    const users = await Promise.all(
      userData.map((user) =>
        User.findOneAndUpdate({ username: user.username }, { $set: user }, {
          returnDocument: 'after',
          upsert: true,
          runValidators: true,
        }).exec(),
      ),
    );
    const userIds = new Map(users.map((user) => [user.username, user._id]));
    const userId = (username: string) => {
      const id = userIds.get(username);
      if (!id) {
        throw new Error(`Missing seeded user: ${username}`);
      }
      return id;
    };

    const teamData = [
      {
        name: 'Summit Striders',
        description: 'Trail runners building consistency one climb at a time.',
        members: ['maya.chen', 'jordan.lee', 'sofia.ramirez'].map(userId),
      },
      {
        name: 'Harbor Strength',
        description: 'A friendly team focused on strength and recovery.',
        members: ['sofia.ramirez', 'ethan.brooks'].map(userId),
      },
    ];
    await Promise.all(
      teamData.map((team) =>
        Team.findOneAndUpdate({ name: team.name }, { $set: team }, {
          returnDocument: 'after',
          upsert: true,
          runValidators: true,
        }).exec(),
      ),
    );

    const activityData = [
      {
        user: userId('maya.chen'),
        activityType: 'running',
        durationMinutes: 32,
        distanceKm: 5.2,
        points: 52,
        recordedAt: new Date('2026-09-21T07:30:00.000Z'),
      },
      {
        user: userId('jordan.lee'),
        activityType: 'cycling',
        durationMinutes: 40,
        distanceKm: 14.5,
        points: 72,
        recordedAt: new Date('2026-09-22T16:15:00.000Z'),
      },
      {
        user: userId('sofia.ramirez'),
        activityType: 'strength',
        durationMinutes: 45,
        distanceKm: 0,
        points: 50,
        recordedAt: new Date('2026-09-23T18:00:00.000Z'),
      },
      {
        user: userId('ethan.brooks'),
        activityType: 'walking',
        durationMinutes: 40,
        distanceKm: 3.1,
        points: 31,
        recordedAt: new Date('2026-09-24T12:10:00.000Z'),
      },
      {
        user: userId('maya.chen'),
        activityType: 'cycling',
        durationMinutes: 28,
        distanceKm: 8.4,
        points: 45,
        recordedAt: new Date('2026-09-25T07:45:00.000Z'),
      },
    ];
    await Promise.all(
      activityData.map((activity) =>
        Activity.findOneAndUpdate(
          {
            user: activity.user,
            activityType: activity.activityType,
            recordedAt: activity.recordedAt,
          },
          { $set: activity },
          { returnDocument: 'after', upsert: true, runValidators: true },
        ).exec(),
      ),
    );

    const leaderboardData = [
      { username: 'maya.chen', points: 242 },
      { username: 'jordan.lee', points: 210 },
      { username: 'sofia.ramirez', points: 185 },
      { username: 'ethan.brooks', points: 147 },
    ];
    await Promise.all(
      leaderboardData.map(({ username, points }) =>
        LeaderboardEntry.findOneAndUpdate(
          { user: userId(username) },
          { $set: { user: userId(username), points } },
          { returnDocument: 'after', upsert: true, runValidators: true },
        ).exec(),
      ),
    );

    const workoutData = [
      {
        name: 'Interval Run',
        description: 'A short warm-up followed by alternating brisk and easy intervals.',
        category: 'running',
        difficulty: 'intermediate',
        durationMinutes: 35,
      },
      {
        name: 'Core and Mobility',
        description: 'A low-impact session for trunk stability and hip mobility.',
        category: 'strength',
        difficulty: 'beginner',
        durationMinutes: 20,
      },
      {
        name: 'Full-Body Strength',
        description: 'A balanced circuit of compound movements and controlled rests.',
        category: 'strength',
        difficulty: 'intermediate',
        durationMinutes: 45,
      },
      {
        name: 'Recovery Walk',
        description: 'An easy-paced walk to support active recovery.',
        category: 'walking',
        difficulty: 'beginner',
        durationMinutes: 30,
      },
    ];
    await Promise.all(
      workoutData.map((workout) =>
        Workout.findOneAndUpdate({ name: workout.name }, { $set: workout }, {
          returnDocument: 'after',
          upsert: true,
          runValidators: true,
        }).exec(),
      ),
    );

    console.log(
      `Database seeding complete: ${userData.length} users, ${teamData.length} teams, ` +
        `${activityData.length} activities, ${leaderboardData.length} leaderboard entries, ` +
        `${workoutData.length} workouts.`,
    );
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

void seedDatabase();
