/**
 * Seed script to populate the database with fake users, posts, likes, comments, bookmarks, and follows.
 *
 * Run: node seed.js
 */

import { setServers } from "node:dns/promises";
setServers(["1.1.1.1", "8.8.8.8"]);

import "dotenv/config.js";
import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import User from "./models/user.model.js";
import Post from "./models/post.model.js";
import Like from "./models/like.model.js";
import Comment from "./models/comment.model.js";
import Bookmark from "./models/bookmark.model.js";
import Follow from "./models/follow.model.js";

// ─── Helpers ────────────────────────────────────────────────────────────────
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

// ─── Fake data pools ───────────────────────────────────────────────────────

const AVATAR_STYLES = [
  "adventurer",
  "avataaars",
  "big-ears",
  "bottts",
  "croodles",
  "fun-emoji",
  "lorelei",
  "micah",
  "miniavs",
  "open-peeps",
  "personas",
  "pixel-art",
];

function randomAvatar(seed) {
  const style = pick(AVATAR_STYLES);
  return `https://api.dicebear.com/9.x/${style}/svg?seed=${encodeURIComponent(seed)}`;
}

const FAKE_USERS = [
  {
    name: "Vikram",
    username: "vikram_amar",
    email: "vikram.amar.fake@example.com",
    bio: "Duty is my identity. Justice never sleeps 🔥",
  },
  {
    name: "Anniyan",
    username: "anniyan_ambi",
    email: "anniyan.ambi.fake@example.com",
    bio: "Quality is not an act, it is a habit 😤⚖️",
  },
  {
    name: "Kabali",
    username: "kabali_da",
    email: "kabali.da.fake@example.com",
    bio: "Neruppuda! Rising from the ashes 🦁",
  },
  {
    name: "Pugazh",
    username: "pugazh_master",
    email: "pugazh.master.fake@example.com",
    bio: "Life is a game, play it like a Master 🎓💪",
  },
  {
    name: "Rolex",
    username: "rolex_vikram",
    email: "rolex.vikram.fake@example.com",
    bio: "Time waits for no one. Neither do I ⏱️🔥",
  },
];

const POST_CONTENTS = [
  "Just shipped a new feature! Feeling accomplished 🎉",
  "Hot take: dark mode should be the default everywhere.",
  "Anyone else love the sound of rain while coding? 🌧️",
  "Today I learned that CSS Grid is way more powerful than I thought. Mind blown 🤯",
  "Morning run ✔️ Healthy breakfast ✔️ Time to crush some code 💪",
  "Unpopular opinion: tabs > spaces. Fight me.",
  "Just finished reading 'Atomic Habits'. Highly recommend for fellow devs 📖",
  "Working on a side project that I'm really excited about. Can't wait to share it with everyone!",
  "The sunset today was absolutely breathtaking 🌅",
  "Coffee is not a want, it's a NEED ☕",
  "Finally figured out that nasty bug. It was a missing semicolon... of course 😂",
  "Weekend vibes: Netflix, pizza, and zero commits 🍕",
  "Gratitude post: thankful for this amazing dev community ❤️",
  "Debugging is like being a detective in a crime movie where you're also the murderer 🕵️",
  "Just hit 1000 contributions on GitHub! Small wins matter 🏆",
  "React or Vue? Both are great, but my heart belongs to React ⚛️",
  "Started learning Rust today. My brain hurts but in a good way 🦀",
  "Pro tip: take breaks. Your best ideas come when you step away from the screen 🧠",
  "Beautiful day for a hike! Nature is the best debugging tool 🏔️",
  "Just deployed my portfolio site. Feedback welcome! 🌐",
  "Late night coding session. The code flows better at 2 AM apparently 🌙",
  "Attended an amazing tech meetup today. Networking is underrated!",
  "My rubber duck is the best debugging partner I've ever had 🦆",
  "Remember: code is read more often than it's written. Write clean code!",
  "Sunday project: building a CLI tool for my workflow automation ⚡",
];

const COMMENT_CONTENTS = [
  "Love this! 🔥",
  "Totally agree with you on this one!",
  "Haha, so relatable 😂",
  "Great perspective! Thanks for sharing.",
  "This is exactly what I needed to hear today.",
  "Can you share more details about this?",
  "Incredible work! Keep it up! 💪",
  "I've been thinking the same thing lately.",
  "This made my day 😊",
  "Wow, that's impressive!",
  "Bookmarking this for later 📌",
  "You're absolutely right about this.",
  "That's a hot take but I respect it 😄",
  "Needed this motivation today!",
  "This is gold ✨",
  "Could not agree more!",
  "Insightful as always 🙌",
  "You nailed it!",
  "Adding this to my to-do list!",
  "The community needs more posts like this ❤️",
];

// ─── Main seed function ─────────────────────────────────────────────────────
async function seed() {
  console.log("🌱 Connecting to database...");
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("✅ Connected!\n");

  // ── 0. Clean up previous seed data ─────────────────────────────────────
  console.log("🧹 Cleaning up old seed data...");
  const oldUsers = await User.find({ email: /@example\.com$/i });
  if (oldUsers.length > 0) {
    const oldIds = oldUsers.map((u) => u._id);
    await Post.deleteMany({ author: { $in: oldIds } });
    await Like.deleteMany({ user: { $in: oldIds } });
    await Comment.deleteMany({ user: { $in: oldIds } });
    await Bookmark.deleteMany({ user: { $in: oldIds } });
    await Follow.deleteMany({
      $or: [{ follower: { $in: oldIds } }, { following: { $in: oldIds } }],
    });
    await User.deleteMany({ _id: { $in: oldIds } });
    console.log(`   🗑️  Removed ${oldUsers.length} old seed users and their data.`);
  } else {
    console.log("   ✅ No old seed data found.");
  }

  // ── 1. Create users ────────────────────────────────────────────────────
  console.log("👤 Creating 5 fake users...");
  const hashedPassword = await bcryptjs.hash("Password@123", 12);

  const createdUsers = [];
  for (const u of FAKE_USERS) {
    // Skip if user already exists
    const exists = await User.findOne({ email: u.email });
    if (exists) {
      console.log(`   ⏭️  ${u.username} already exists, skipping.`);
      createdUsers.push(exists);
      continue;
    }

    const user = await User.create({
      name: u.name,
      username: u.username,
      email: u.email,
      bio: u.bio,
      password: hashedPassword,
      avator: randomAvatar(u.username),
      isVerified: true,
      authType: "credentials",
      tokenVersion: 0,
      followersCounts: 0,
      followingCounts: 0,
    });
    createdUsers.push(user);
    console.log(`   ✅ Created: ${user.username} (${user._id})`);
  }

  // ── 2. Create posts (3-5 per user) ─────────────────────────────────────
  console.log("\n📝 Creating posts...");
  const shuffledPosts = shuffle(POST_CONTENTS);
  const createdPosts = [];
  let postIndex = 0;

  for (const user of createdUsers) {
    const numPosts = randInt(3, 5);
    for (let i = 0; i < numPosts; i++) {
      const content = shuffledPosts[postIndex % shuffledPosts.length];
      postIndex++;

      const post = await Post.create({
        author: user._id,
        content,
        images: [],
        likesCount: 0,
        commentsCount: 0,
      });
      createdPosts.push(post);
      console.log(
        `   📄 Post by ${user.username}: "${content.slice(0, 40)}..."`,
      );
    }
  }

  // ── 3. Create likes (each user likes 5-10 random posts) ────────────────
  console.log("\n❤️  Creating likes...");
  let totalLikes = 0;

  for (const user of createdUsers) {
    const numLikes = randInt(5, Math.min(10, createdPosts.length));
    const postsToLike = shuffle(createdPosts).slice(0, numLikes);

    for (const post of postsToLike) {
      try {
        await Like.create({ user: user._id, post: post._id });
        await Post.findByIdAndUpdate(post._id, {
          $inc: { likesCount: 1 },
        });
        totalLikes++;
      } catch {
        // duplicate like, skip
      }
    }
  }
  console.log(`   ✅ Created ${totalLikes} likes`);

  // ── 4. Create comments (each user comments on 3-6 random posts) ────────
  console.log("\n💬 Creating comments...");
  let totalComments = 0;

  for (const user of createdUsers) {
    const numComments = randInt(3, 6);
    const postsToComment = shuffle(createdPosts).slice(0, numComments);

    for (const post of postsToComment) {
      const content = pick(COMMENT_CONTENTS);
      await Comment.create({
        user: user._id,
        post: post._id,
        content,
      });
      await Post.findByIdAndUpdate(post._id, {
        $inc: { commentsCount: 1 },
      });
      totalComments++;
    }
  }
  console.log(`   ✅ Created ${totalComments} comments`);

  // ── 5. Create bookmarks (each user bookmarks 2-5 random posts) ─────────
  console.log("\n🔖 Creating bookmarks...");
  let totalBookmarks = 0;

  for (const user of createdUsers) {
    const numBookmarks = randInt(2, 5);
    const postsToBookmark = shuffle(createdPosts).slice(0, numBookmarks);

    for (const post of postsToBookmark) {
      try {
        await Bookmark.create({ user: user._id, post: post._id });
        totalBookmarks++;
      } catch {
        // duplicate bookmark, skip
      }
    }
  }
  console.log(`   ✅ Created ${totalBookmarks} bookmarks`);

  // ── 6. Create follows (each user follows 2-4 other users) ──────────────
  console.log("\n👥 Creating follows...");
  let totalFollows = 0;

  for (const user of createdUsers) {
    const others = createdUsers.filter(
      (u) => u._id.toString() !== user._id.toString(),
    );
    const numFollows = randInt(2, Math.min(4, others.length));
    const usersToFollow = shuffle(others).slice(0, numFollows);

    for (const target of usersToFollow) {
      try {
        await Follow.create({
          follower: user._id,
          following: target._id,
        });
        await User.findByIdAndUpdate(user._id, {
          $inc: { followingCounts: 1 },
        });
        await User.findByIdAndUpdate(target._id, {
          $inc: { followersCounts: 1 },
        });
        totalFollows++;
      } catch {
        // duplicate follow, skip
      }
    }
  }
  console.log(`   ✅ Created ${totalFollows} follows`);

  // ── Summary ────────────────────────────────────────────────────────────
  console.log("\n" + "═".repeat(50));
  console.log("🎉 SEED COMPLETE!");
  console.log("═".repeat(50));
  console.log(`   👤 Users:     ${createdUsers.length}`);
  console.log(`   📝 Posts:     ${createdPosts.length}`);
  console.log(`   ❤️  Likes:     ${totalLikes}`);
  console.log(`   💬 Comments:  ${totalComments}`);
  console.log(`   🔖 Bookmarks: ${totalBookmarks}`);
  console.log(`   👥 Follows:   ${totalFollows}`);
  console.log("═".repeat(50));
  console.log("\n🔑 All users have password: Password@123");
  console.log("═".repeat(50));

  await mongoose.disconnect();
  console.log("\n👋 Disconnected from database.");
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
