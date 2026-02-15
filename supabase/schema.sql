-- ============================================
-- TONG (통) Korean Learning App
-- Supabase Database Schema
-- Run this in Supabase SQL Editor
-- ============================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. PROFILES (extends auth.users)
-- ============================================
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  role TEXT NOT NULL CHECK (role IN ('student', 'teacher')) DEFAULT 'student',
  display_name TEXT NOT NULL,
  avatar_url TEXT,
  avatar_emoji TEXT DEFAULT '🧑‍🎤',
  level INTEGER DEFAULT 1,
  xp INTEGER DEFAULT 0,
  tp INTEGER DEFAULT 100, -- TONG Points
  streak_days INTEGER DEFAULT 0,
  streak_last_date DATE,
  timezone TEXT DEFAULT 'Asia/Seoul',
  locale TEXT DEFAULT 'en' CHECK (locale IN ('en', 'ko')),
  onboarding_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 2. TEACHER PROFILES
-- ============================================
CREATE TABLE public.teacher_profiles (
  id UUID REFERENCES public.profiles(id) ON DELETE CASCADE PRIMARY KEY,
  bio TEXT,
  experience TEXT,
  education TEXT,
  specialties TEXT[] DEFAULT '{}',
  languages TEXT[] DEFAULT '{Korean, English}',
  price_30 NUMERIC(6,2) DEFAULT 18.00,
  price_50 NUMERIC(6,2) DEFAULT 28.00,
  avail_morning BOOLEAN DEFAULT FALSE,
  avail_afternoon BOOLEAN DEFAULT FALSE,
  avail_evening BOOLEAN DEFAULT TRUE,
  avail_night BOOLEAN DEFAULT FALSE,
  intro_video_url TEXT,
  rating NUMERIC(2,1) DEFAULT 0.0,
  total_reviews INTEGER DEFAULT 0,
  total_lessons INTEGER DEFAULT 0,
  total_students INTEGER DEFAULT 0,
  is_verified BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 3. STUDENT PROFILES
-- ============================================
CREATE TABLE public.student_profiles (
  id UUID REFERENCES public.profiles(id) ON DELETE CASCADE PRIMARY KEY,
  korean_level INTEGER DEFAULT 1, -- 1-7
  learning_goals TEXT[] DEFAULT '{}',
  k_culture_interests TEXT[] DEFAULT '{}',
  preferred_schedule TEXT[] DEFAULT '{}',
  total_lessons INTEGER DEFAULT 0,
  lessons_since_test INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 4. LESSONS / BOOKINGS
-- ============================================
CREATE TABLE public.lessons (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  teacher_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')) DEFAULT 'pending',
  duration INTEGER NOT NULL CHECK (duration IN (10, 20, 30, 50)),
  price NUMERIC(6,2) NOT NULL,
  scheduled_at TIMESTAMPTZ NOT NULL,
  meet_link TEXT,
  topic TEXT,
  notes TEXT,
  cancelled_by UUID REFERENCES public.profiles(id),
  cancelled_reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 5. FEEDBACK (post-lesson)
-- ============================================
CREATE TABLE public.feedback (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE NOT NULL UNIQUE,
  teacher_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  overall_rating INTEGER CHECK (overall_rating BETWEEN 1 AND 5),
  skills JSONB DEFAULT '{}', -- { "Speaking": 4, "Listening": 3, ... }
  strengths TEXT,
  improvements TEXT,
  notes TEXT,
  homework TEXT[] DEFAULT '{}',
  homework_note TEXT,
  tp_earned INTEGER DEFAULT 30,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 6. REVIEWS
-- ============================================
CREATE TABLE public.reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE,
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  teacher_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 7. MESSAGES
-- ============================================
CREATE TABLE public.conversations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  participant_1 UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  participant_2 UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  last_message_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE NOT NULL,
  sender_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 8. COMMUNITY POSTS
-- ============================================
CREATE TABLE public.posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('All', 'K-POP', 'K-Drama', 'K-Food', 'Travel', 'Study Tips', 'Free Talk')),
  title TEXT,
  content TEXT NOT NULL,
  image_url TEXT,
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.post_likes (
  post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (post_id, user_id)
);

CREATE TABLE public.post_comments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE NOT NULL,
  author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.post_saves (
  post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (post_id, user_id)
);

-- ============================================
-- 9. NOTIFICATIONS
-- ============================================
CREATE TABLE public.notifications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('booking', 'reminder', 'message', 'achievement', 'feedback', 'community', 'system')),
  title TEXT NOT NULL,
  description TEXT,
  action_url TEXT,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 10. AVATAR ITEMS
-- ============================================
CREATE TABLE public.avatar_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  category TEXT NOT NULL CHECK (category IN ('Hair', 'Face', 'Top', 'Bottom', 'Shoes', 'Accessory', 'Background', 'Pet')),
  name TEXT NOT NULL,
  emoji TEXT NOT NULL,
  price INTEGER NOT NULL DEFAULT 0, -- TP cost
  rarity TEXT NOT NULL CHECK (rarity IN ('Common', 'Rare', 'Epic', 'Legendary')) DEFAULT 'Common',
  level_required INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.user_avatar_items (
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  item_id UUID REFERENCES public.avatar_items(id) ON DELETE CASCADE NOT NULL,
  equipped BOOLEAN DEFAULT FALSE,
  purchased_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, item_id)
);

-- ============================================
-- 11. BADGES / ACHIEVEMENTS
-- ============================================
CREATE TABLE public.badges (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  category TEXT NOT NULL CHECK (category IN ('Learning', 'Social', 'Streak', 'Special')),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  emoji TEXT NOT NULL,
  xp_reward INTEGER DEFAULT 0,
  rarity TEXT NOT NULL CHECK (rarity IN ('Common', 'Rare', 'Epic', 'Legendary')) DEFAULT 'Common',
  condition_type TEXT, -- e.g. 'lessons_completed', 'streak_days', etc.
  condition_value INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.user_badges (
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  badge_id UUID REFERENCES public.badges(id) ON DELETE CASCADE NOT NULL,
  progress INTEGER DEFAULT 0,
  earned BOOLEAN DEFAULT FALSE,
  earned_at TIMESTAMPTZ,
  PRIMARY KEY (user_id, badge_id)
);

-- ============================================
-- 12. TP TRANSACTIONS (Point Ledger)
-- ============================================
CREATE TABLE public.tp_transactions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  amount INTEGER NOT NULL, -- positive = earned, negative = spent
  reason TEXT NOT NULL,
  reference_id UUID, -- lesson_id, post_id, item_id, etc.
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teacher_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_saves ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.avatar_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_avatar_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tp_transactions ENABLE ROW LEVEL SECURITY;

-- PROFILES: users can read all, update own
CREATE POLICY "Profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- TEACHER PROFILES: viewable by all, editable by owner
CREATE POLICY "Teacher profiles are viewable by everyone" ON public.teacher_profiles FOR SELECT USING (true);
CREATE POLICY "Teachers can update own profile" ON public.teacher_profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Teachers can insert own profile" ON public.teacher_profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- STUDENT PROFILES: viewable by self and their teachers
CREATE POLICY "Students can view own profile" ON public.student_profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Students can update own profile" ON public.student_profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Students can insert own profile" ON public.student_profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- LESSONS: viewable by participants
CREATE POLICY "Lesson participants can view" ON public.lessons FOR SELECT USING (auth.uid() = student_id OR auth.uid() = teacher_id);
CREATE POLICY "Students can create lessons" ON public.lessons FOR INSERT WITH CHECK (auth.uid() = student_id);
CREATE POLICY "Participants can update lessons" ON public.lessons FOR UPDATE USING (auth.uid() = student_id OR auth.uid() = teacher_id);

-- FEEDBACK: viewable by participants
CREATE POLICY "Feedback viewable by participants" ON public.feedback FOR SELECT USING (auth.uid() = teacher_id OR auth.uid() = student_id);
CREATE POLICY "Teachers can create feedback" ON public.feedback FOR INSERT WITH CHECK (auth.uid() = teacher_id);

-- REVIEWS: viewable by all, writable by students
CREATE POLICY "Reviews are viewable by everyone" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Students can create reviews" ON public.reviews FOR INSERT WITH CHECK (auth.uid() = student_id);

-- CONVERSATIONS: viewable by participants
CREATE POLICY "Conversation participants can view" ON public.conversations FOR SELECT USING (auth.uid() = participant_1 OR auth.uid() = participant_2);
CREATE POLICY "Users can create conversations" ON public.conversations FOR INSERT WITH CHECK (auth.uid() = participant_1 OR auth.uid() = participant_2);

-- MESSAGES: viewable by conversation participants
CREATE POLICY "Message participants can view" ON public.messages FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.conversations c WHERE c.id = conversation_id AND (c.participant_1 = auth.uid() OR c.participant_2 = auth.uid()))
);
CREATE POLICY "Users can send messages" ON public.messages FOR INSERT WITH CHECK (auth.uid() = sender_id);
CREATE POLICY "Recipients can mark read" ON public.messages FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.conversations c WHERE c.id = conversation_id AND (c.participant_1 = auth.uid() OR c.participant_2 = auth.uid()))
);

-- POSTS: viewable by all, editable by author
CREATE POLICY "Posts are viewable by everyone" ON public.posts FOR SELECT USING (true);
CREATE POLICY "Users can create posts" ON public.posts FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Authors can update posts" ON public.posts FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "Authors can delete posts" ON public.posts FOR DELETE USING (auth.uid() = author_id);

-- POST LIKES
CREATE POLICY "Likes viewable by all" ON public.post_likes FOR SELECT USING (true);
CREATE POLICY "Users can like" ON public.post_likes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can unlike" ON public.post_likes FOR DELETE USING (auth.uid() = user_id);

-- POST COMMENTS
CREATE POLICY "Comments viewable by all" ON public.post_comments FOR SELECT USING (true);
CREATE POLICY "Users can comment" ON public.post_comments FOR INSERT WITH CHECK (auth.uid() = author_id);

-- POST SAVES
CREATE POLICY "Saves viewable by owner" ON public.post_saves FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can save" ON public.post_saves FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can unsave" ON public.post_saves FOR DELETE USING (auth.uid() = user_id);

-- NOTIFICATIONS: viewable by owner
CREATE POLICY "Users can view own notifications" ON public.notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON public.notifications FOR UPDATE USING (auth.uid() = user_id);

-- AVATAR ITEMS: viewable by all
CREATE POLICY "Avatar items viewable by all" ON public.avatar_items FOR SELECT USING (true);

-- USER AVATAR ITEMS: viewable/editable by owner
CREATE POLICY "Users can view own items" ON public.user_avatar_items FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can buy items" ON public.user_avatar_items FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can equip items" ON public.user_avatar_items FOR UPDATE USING (auth.uid() = user_id);

-- BADGES: viewable by all
CREATE POLICY "Badges viewable by all" ON public.badges FOR SELECT USING (true);

-- USER BADGES: viewable by owner
CREATE POLICY "Users can view own badges" ON public.user_badges FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "System can update badges" ON public.user_badges FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "System can update badge progress" ON public.user_badges FOR UPDATE USING (auth.uid() = user_id);

-- TP TRANSACTIONS: viewable by owner
CREATE POLICY "Users can view own transactions" ON public.tp_transactions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create transactions" ON public.tp_transactions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ============================================
-- TRIGGERS
-- ============================================

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_lessons_updated_at BEFORE UPDATE ON public.lessons FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- Update teacher rating on new review
CREATE OR REPLACE FUNCTION public.update_teacher_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.teacher_profiles
  SET rating = (SELECT AVG(rating)::NUMERIC(2,1) FROM public.reviews WHERE teacher_id = NEW.teacher_id),
      total_reviews = (SELECT COUNT(*) FROM public.reviews WHERE teacher_id = NEW.teacher_id)
  WHERE id = NEW.teacher_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_review_created
  AFTER INSERT ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION public.update_teacher_rating();

-- Update post likes count
CREATE OR REPLACE FUNCTION public.update_post_likes_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.posts SET likes_count = likes_count + 1 WHERE id = NEW.post_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.posts SET likes_count = likes_count - 1 WHERE id = OLD.post_id;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_post_like_change
  AFTER INSERT OR DELETE ON public.post_likes
  FOR EACH ROW EXECUTE FUNCTION public.update_post_likes_count();

-- Update post comments count
CREATE OR REPLACE FUNCTION public.update_post_comments_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.posts SET comments_count = comments_count + 1 WHERE id = NEW.post_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_post_comment_created
  AFTER INSERT ON public.post_comments
  FOR EACH ROW EXECUTE FUNCTION public.update_post_comments_count();

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX idx_lessons_student ON public.lessons(student_id);
CREATE INDEX idx_lessons_teacher ON public.lessons(teacher_id);
CREATE INDEX idx_lessons_scheduled ON public.lessons(scheduled_at);
CREATE INDEX idx_messages_conversation ON public.messages(conversation_id);
CREATE INDEX idx_posts_category ON public.posts(category);
CREATE INDEX idx_posts_author ON public.posts(author_id);
CREATE INDEX idx_notifications_user ON public.notifications(user_id, read);
CREATE INDEX idx_tp_transactions_user ON public.tp_transactions(user_id);
