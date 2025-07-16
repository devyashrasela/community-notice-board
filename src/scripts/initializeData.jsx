import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../Services/firebase.config";

const sampleUsers = [
  {
    name: "Admin Manager",
    role: "Admin",
    email: "admin@community.com",
    totalPosts: 45,
    totalParticipations: 3
  },
  {
    name: "Alex Johnson",
    role: "User",
    email: "alex.johnson@community.com",
    totalPosts: 12,
    totalParticipations: 8
  },
  {
    name: "Sarah Chen",
    role: "User",
    email: "sarah.chen@community.com",
    totalPosts: 7,
    totalParticipations: 15
  },
  {
    name: "Mike Rodriguez",
    role: "User",
    email: "mike.rodriguez@community.com",
    totalPosts: 23,
    totalParticipations: 6
  },
  {
    name: "Emily Davis",
    role: "User",
    email: "emily.davis@community.com",
    totalPosts: 5,
    totalParticipations: 12
  }
];

const samplePosts = [
  {
    type: "post",
    userName: "Alex Johnson",
    userImage: "https://ui-avatars.com/api/?name=Alex+Johnson",
    date: new Date().toISOString(), // Current timestamp for newest post
    tags: ["Discussion", "Latest"],
    image: "https://via.placeholder.com/400x150?text=Latest+Post",
    title: "Welcome to Our Community Board!",
    content: "This is the newest post in our community. Feel free to share your thoughts and engage with other members!",
    liked: false,
    saved: false,
  },
  {
    type: "notice",
    userName: "Admin Manager",
    userImage: "https://ui-avatars.com/api/?name=Admin+Manager",
    date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    tags: ["Notice", "Important"],
    image: "https://via.placeholder.com/400x150?text=Notice+1",
    title: "Electricity Maintenance",
    description: "Electricity will be unavailable from 1pm to 3pm today for maintenance.",
    liked: false,
    saved: false,
  },
  {
    type: "event",
    userName: "Sarah Chen",
    userImage: "https://ui-avatars.com/api/?name=Sarah+Chen",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    tags: ["Meetup", "Health"],
    image: "https://via.placeholder.com/400x150?text=Event+1",
    title: "Yoga Morning",
    description: "Join us for a fresh start with yoga in the community park.",
    eventDate: "2025-07-19T07:00:00",
    location: "Community Park",
    organizer: "Wellness Team",
    liked: false,
    saved: true,
  },
  {
    type: "notice",
    userName: "Admin Manager",
    userImage: "https://ui-avatars.com/api/?name=Admin+Manager",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    tags: ["Urgent", "Notice"],
    image: "https://via.placeholder.com/400x150?text=Notice+2",
    title: "Water Supply Disruption",
    description: "There will be no water supply from 8am to 11am tomorrow.",
    liked: false,
    saved: false,
  },
  {
    type: "post",
    userName: "Mike Rodriguez",
    userImage: "https://ui-avatars.com/api/?name=Mike+Rodriguez",
    date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
    tags: ["Suggestion", "Community"],
    image: "https://via.placeholder.com/400x150?text=Post+2",
    title: "More Waste Bins Needed",
    content: "Could we install more dustbins in the central park area? It would help keep our community cleaner.",
    liked: false,
    saved: false,
  },
  {
    type: "event",
    userName: "Emily Davis",
    userImage: "https://ui-avatars.com/api/?name=Emily+Davis",
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    tags: ["Cultural", "Event"],
    image: "https://via.placeholder.com/400x150?text=Event+2",
    title: "Independence Day Parade",
    description: "Celebrate Independence Day with a parade and flag hoisting.",
    eventDate: "2025-08-15T08:00:00",
    location: "Main Road",
    organizer: "Cultural Committee",
    liked: false,
    saved: false,
  },
  {
    type: "post",
    userName: "Sarah Chen",
    userImage: "https://ui-avatars.com/api/?name=Sarah+Chen",
    date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), // 6 days ago
    tags: ["Discussion", "Feedback"],
    image: "https://via.placeholder.com/400x150?text=Post+3",
    title: "Community Garden Initiative",
    content: "What do you think about starting a community garden? We could grow vegetables and herbs together!",
    liked: true,
    saved: false,
  },
  {
    type: "notice",
    userName: "Admin Manager",
    userImage: "https://ui-avatars.com/api/?name=Admin+Manager",
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    tags: ["Notice", "Maintenance"],
    image: "https://via.placeholder.com/400x150?text=Notice+3",
    title: "Elevator Maintenance",
    description: "Building A elevator will be under maintenance from 9am to 5pm on Saturday.",
    liked: false,
    saved: false,
  }
];

export const initializeData = async () => {
  try {
    console.log("Starting data initialization...");
    
    // Check if data already exists
    const usersSnapshot = await getDocs(collection(db, "users"));
    const postsSnapshot = await getDocs(collection(db, "posts"));
    
    let usersAdded = 0;
    let postsAdded = 0;
    
    if (usersSnapshot.empty) {
      console.log("Adding sample users...");
      for (const user of sampleUsers) {
        await addDoc(collection(db, "users"), user);
        usersAdded++;
        console.log(`Added user: ${user.name} (${user.role})`);
      }
      console.log(`${usersAdded} sample users added successfully!`);
    } else {
      console.log(`Users collection already has ${usersSnapshot.size} users, skipping user initialization`);
    }
    
    if (postsSnapshot.empty) {
      console.log("Adding sample posts...");
      for (const post of samplePosts) {
        await addDoc(collection(db, "posts"), post);
        postsAdded++;
        console.log(`Added ${post.type}: ${post.title}`);
      }
      console.log(`${postsAdded} sample posts added successfully!`);
    } else {
      console.log(`Posts collection already has ${postsSnapshot.size} posts, skipping post initialization`);
    }
    
    console.log("Data initialization completed successfully!");
    return {
      usersAdded,
      postsAdded,
      totalUsers: usersSnapshot.size || usersAdded,
      totalPosts: postsSnapshot.size || postsAdded
    };
    
  } catch (error) {
    console.error("Error initializing data:", error);
    throw new Error(`Failed to initialize data: ${error.message}`);
  }
};

// Enhanced function to clear all data (for development)
export const clearAllData = async () => {
  try {
    console.log("Starting data cleanup...");
    
    const usersSnapshot = await getDocs(collection(db, "users"));
    const postsSnapshot = await getDocs(collection(db, "posts"));
    
    let usersDeleted = 0;
    let postsDeleted = 0;
    
    // Delete all users
    for (const userDoc of usersSnapshot.docs) {
      await deleteDoc(doc(db, "users", userDoc.id));
      usersDeleted++;
      console.log(`Deleted user: ${userDoc.data().name}`);
    }
    
    // Delete all posts
    for (const postDoc of postsSnapshot.docs) {
      await deleteDoc(doc(db, "posts", postDoc.id));
      postsDeleted++;
      console.log(`Deleted post: ${postDoc.data().title}`);
    }
    
    console.log(`Data cleanup completed! Deleted ${usersDeleted} users and ${postsDeleted} posts.`);
    return {
      usersDeleted,
      postsDeleted
    };
    
  } catch (error) {
    console.error("Error clearing data:", error);
    throw new Error(`Failed to clear data: ${error.message}`);
  }
};

// Function to add a single sample post (for testing)
export const addSamplePost = async (type = "post") => {
  try {
    const samplePost = {
      type,
      userName: "Test User",
      userImage: "https://ui-avatars.com/api/?name=Test+User",
      date: new Date().toISOString(),
      tags: ["Test", "Sample"],
      image: `https://via.placeholder.com/400x150?text=${type.toUpperCase()}+Sample`,
      title: `Sample ${type.charAt(0).toUpperCase() + type.slice(1)}`,
      ...(type === 'post' && { content: "This is a sample post content for testing purposes." }),
      ...(type !== 'post' && { description: `This is a sample ${type} description for testing purposes.` }),
      ...(type === 'event' && {
        eventDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        location: "Community Center",
        organizer: "Test Organizer",
      }),
      liked: false,
      saved: false,
    };
    
    await addDoc(collection(db, "posts"), samplePost);
    console.log(`Sample ${type} added successfully!`);
    return samplePost;
    
  } catch (error) {
    console.error(`Error adding sample ${type}:`, error);
    throw new Error(`Failed to add sample ${type}: ${error.message}`);
  }
};

// Function to get data statistics
export const getDataStats = async () => {
  try {
    const usersSnapshot = await getDocs(collection(db, "users"));
    const postsSnapshot = await getDocs(collection(db, "posts"));
    
    const posts = postsSnapshot.docs.map(doc => doc.data());
    const postTypes = posts.reduce((acc, post) => {
      acc[post.type] = (acc[post.type] || 0) + 1;
      return acc;
    }, {});
    
    const stats = {
      totalUsers: usersSnapshot.size,
      totalPosts: postsSnapshot.size,
      postTypes,
      lastUpdated: new Date().toISOString()
    };
    
    console.log("Data Statistics:", stats);
    return stats;
    
  } catch (error) {
    console.error("Error getting data stats:", error);
    throw new Error(`Failed to get data stats: ${error.message}`);
  }
};
