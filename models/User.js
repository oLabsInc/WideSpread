const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    email2: String,
    email3: String,
    password: {
        type: String,
        required: true
    },
    age: Number,
    dob: Date,
    street: String,
    town: String,
    state: String,
    zip: String,
    country: String,
    phone1: String,
    phoneType1: String,
    phone2: String,
    phoneType2: String,
    fax: String,
    personal_sites: [String],
    gender: String,
    relationshipStatus: String,
    favColor1: String,
    favColor2: String,
    favColor3: String,
    spread_notifications: [{
        spread_type: String,
        from: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        notified: {
            type: Boolean,
            default: false
        },
        recieved: {
            type: Date,
            default: Date.now()
        },
        spread_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Spread'}
    }],
    friend_requests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true
    }],
    pending_friend_requests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true
    }],
    friends: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            unique: true
    }],
    chats: [String],
    posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
    saved_posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
    saved_articles: [{type: mongoose.Schema.Types.ObjectId, ref: 'Article'}],
    saved_lessons: [{type: mongoose.Schema.Types.ObjectId, ref: 'LearningPoint'}],
    questions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Question'}],
    polls: [{type: mongoose.Schema.Types.ObjectId, ref: 'Poll'}],
    inSpreads: [{
        inSpread: {type: mongoose.Schema.Types.ObjectId, ref: 'InSpread'}
    }],
    likedPosts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
    likedComments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
    notebookCollection: [{type: mongoose.Schema.Types.ObjectId, ref: 'NotebookCollection'}],
    todoLists: [{type: mongoose.Schema.Types.ObjectId, ref: 'TodoList'}],
    about: String,
    current_occupation: String,
    social: {
        github: String,
        linkedin: String,
        facebook: String,
        instagram: String,
        twitter: String,
        pinterest: String,
        rumble: String,
        discord: String,
        tiktok: String,
        foursquare: String,
        google_plus: String,
        snapchat: String,
        reddit: String,
        slack: String,
        twitch: String,
        whatsapp: String,
        telegram: String,
        youtube: String,
        codepen: String,
        kickstarter: String,
        stack_overflow: String,
        figma: String,
        dribble: String,
        playstation: String,
        xbox: String,
        paypal: String,
        patreon: String,
        patreon: String,
        trello: String
    },
    user_background_image: String,
    user_background_image_url: String,
    user_background_video_url: String,
    user_vr_background_image: String,
    user_vr_background_image_url: String,
    user_images: [String],
    user_inspread_images: [String],
    user_inspread_videos: [{
        video: String,
        poster: String
    }],
    user_avatar: String,
    user_video: [String],
    movie_list: [
        {
            movie_link: {},
            movie_name: String,
            movie_poster: String
        }
    ],
    show_list: [
        {
            show_link: String,
            show_name: String,
            show_poster: String
        }
    ],
    user_audio: [String],
    resume: {type: mongoose.Schema.Types.ObjectId, ref: 'Resume'},
    previous_education: [{
        institution: String, // School/University name
        grade_numbers: {
            start: String,
            end: String
        }, // K - 3 || K - 8 || 3 - 5 || 5 - 8 || 9 - 12 || 13 - 16 || 17 - 20 || etc.
        attended: {
            start: Date,
            end: {
                completed: Boolean,
                completion_date: Date // Projected date || Completion date
            },
            gpa: Number
        },
        awards: [String]
    }],
    previous_professions: [{
        institution: String, // Company name
        role: String,
        employment_dates: {
            start: Date,
            end: Date
        },
        awards: [String],
        job_description: String,
    }],
    workouts: {type: mongoose.Schema.Types.ObjectId, ref: 'WorkoutSchedule'},
    spread_chats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SpreadChat' }],
    date: {
        type: Date,
        default: Date.now
    }
});

UserSchema.methods.addFriend = function(friend)  {
    let friendList = this.friends;
    
    let UserId = this.id
    friendList.push({friendId: this.friendId});
    
    this.save();
}
 
const User = mongoose.model('User', UserSchema);

module.exports = User;