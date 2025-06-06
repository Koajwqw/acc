import { User, Contest, Challenge, ContestAttempt, UserProgress, Event, ForumTopic, DataStore } from '../types';

class DataManager {
  private static instance: DataManager;
  private data: DataStore;

  private constructor() {
    this.data = this.loadData();
  }

  public static getInstance(): DataManager {
    if (!DataManager.instance) {
      DataManager.instance = new DataManager();
    }
    return DataManager.instance;
  }

  private loadData(): DataStore {
    try {
      // Load each data type from separate files
      const users = this.loadUsers();
      const contests = this.loadContests();
      const challenges = this.loadChallenges();
      const contestAttempts = this.loadContestAttempts();
      const userProgress = this.loadUserProgress();
      const events = this.loadEvents();
      const forumTopics = this.loadForumTopics();

      return {
        users,
        contests,
        challenges,
        contestAttempts,
        userProgress,
        events,
        forumTopics,
        lastUpdated: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error loading data:', error);
      return this.getDefaultData();
    }
  }

  private loadUsers(): User[] {
    try {
      const savedUsers = localStorage.getItem('vaic_users');
      if (savedUsers) {
        return JSON.parse(savedUsers);
      }
    } catch (error) {
      console.error('Error loading users:', error);
    }
    
    return [
      {
        id: '1',
        username: 'AIExplorer',
        email: 'explorer@vaic.com',
        password: 'explorer123',
        score: 150,
        joinDate: '2024-01-15',
        role: 'user',
        studentId: 'SV001'
      },
      {
        id: '2',
        username: 'TechWizard',
        email: 'wizard@vaic.com',
        password: 'wizard456',
        score: 120,
        joinDate: '2024-01-20',
        role: 'user',
        studentId: 'SV002'
      },
      {
        id: '3',
        username: 'DataMaster',
        email: 'master@vaic.com',
        password: 'master789',
        score: 180,
        joinDate: '2024-01-10',
        role: 'user',
        studentId: 'SV003'
      },
      {
        id: 'admin',
        username: 'Admin',
        email: 'admin@vaic.com',
        password: 'admin2024',
        score: 999,
        joinDate: '2024-01-01',
        role: 'admin'
      }
    ];
  }

  private loadContests(): Contest[] {
    try {
      const savedContests = localStorage.getItem('vaic_contests');
      if (savedContests) {
        return JSON.parse(savedContests);
      }
    } catch (error) {
      console.error('Error loading contests:', error);
    }

    return [
      {
        id: 'contest1',
        title: 'Kiến thức AI cơ bản',
        description: 'Cuộc thi kiểm tra kiến thức cơ bản về trí tuệ nhân tạo và machine learning',
        challenges: [],
        timeLimit: 30,
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        isActive: true,
        maxAttempts: 3,
        createdBy: 'admin',
        isPublic: true
      },
      {
        id: 'contest2',
        title: 'Python cho AI',
        description: 'Thử thách về việc sử dụng Python trong các dự án AI',
        challenges: [],
        timeLimit: 20,
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        isActive: true,
        maxAttempts: 2,
        createdBy: 'admin',
        isPublic: true
      }
    ];
  }

  private loadChallenges(): Challenge[] {
    try {
      const savedChallenges = localStorage.getItem('vaic_challenges');
      if (savedChallenges) {
        return JSON.parse(savedChallenges);
      }
    } catch (error) {
      console.error('Error loading challenges:', error);
    }

    return [
      {
        id: '1',
        question: 'AI là viết tắt của từ gì?',
        type: 'multiple-choice',
        options: ['Artificial Intelligence', 'Automated Intelligence', 'Advanced Intelligence', 'Applied Intelligence'],
        correctAnswer: 'Artificial Intelligence',
        points: 10,
        difficulty: 'easy',
        contestId: 'contest1'
      },
      {
        id: '2',
        question: 'Thuật toán nào thường được sử dụng cho nhận dạng hình ảnh?',
        type: 'multiple-choice',
        options: ['Linear Regression', 'Convolutional Neural Network', 'Decision Tree', 'K-Means'],
        correctAnswer: 'Convolutional Neural Network',
        points: 20,
        difficulty: 'medium',
        contestId: 'contest1'
      },
      {
        id: '3',
        question: 'Giải thích khái niệm overfitting trong machine learning.',
        type: 'text',
        correctAnswer: 'overfitting',
        points: 30,
        difficulty: 'hard',
        contestId: 'contest1'
      },
      {
        id: '4',
        question: 'Python được sử dụng phổ biến trong AI vì lý do gì?',
        type: 'multiple-choice',
        options: ['Dễ học và sử dụng', 'Có nhiều thư viện AI', 'Cộng đồng lớn', 'Tất cả các lý do trên'],
        correctAnswer: 'Tất cả các lý do trên',
        points: 15,
        difficulty: 'easy',
        contestId: 'contest2'
      },
      {
        id: '5',
        question: 'TensorFlow là gì?',
        type: 'text',
        correctAnswer: 'framework',
        points: 25,
        difficulty: 'medium',
        contestId: 'contest2'
      }
    ];
  }

  private loadContestAttempts(): ContestAttempt[] {
    try {
      const savedAttempts = localStorage.getItem('vaic_contest_attempts');
      if (savedAttempts) {
        return JSON.parse(savedAttempts);
      }
    } catch (error) {
      console.error('Error loading contest attempts:', error);
    }
    return [];
  }

  private loadUserProgress(): UserProgress[] {
    try {
      const savedProgress = localStorage.getItem('vaic_user_progress');
      if (savedProgress) {
        return JSON.parse(savedProgress);
      }
    } catch (error) {
      console.error('Error loading user progress:', error);
    }
    return [];
  }

  private loadEvents(): Event[] {
    try {
      const savedEvents = localStorage.getItem('vaic_events');
      if (savedEvents) {
        return JSON.parse(savedEvents);
      }
    } catch (error) {
      console.error('Error loading events:', error);
    }

    return [
      {
        id: '1',
        title: 'Workshop: Giới thiệu về Machine Learning',
        content: 'Tham gia workshop miễn phí về Machine Learning dành cho người mới bắt đầu. Chúng ta sẽ cùng nhau khám phá:\n\n• Khái niệm cơ bản về ML\n• Các thuật toán phổ biến\n• Thực hành với Python\n• Q&A với chuyên gia\n\nThời gian: 14:00 - 17:00, Thứ 7 tuần tới\nĐịa điểm: Phòng hội thảo A1, Tòa nhà VAIC\n\nĐăng ký ngay để không bỏ lỡ cơ hội học hỏi!',
        author: 'admin',
        authorName: 'Admin',
        createdAt: '2024-01-20T10:00:00Z',
        updatedAt: '2024-01-20T10:00:00Z',
        isPublished: true,
        tags: ['workshop', 'machine learning', 'beginner']
      }
    ];
  }

  private loadForumTopics(): ForumTopic[] {
    try {
      const savedTopics = localStorage.getItem('vaic_forum_topics');
      if (savedTopics) {
        return JSON.parse(savedTopics);
      }
    } catch (error) {
      console.error('Error loading forum topics:', error);
    }

    return [
      {
        id: '1',
        title: 'Thảo luận về tương lai của AI trong giáo dục',
        content: 'AI đang thay đổi cách chúng ta học và dạy. Các bạn nghĩ sao về việc ứng dụng AI trong giáo dục? Những lợi ích và thách thức là gì?',
        author: '1',
        authorName: 'AIExplorer',
        createdAt: '2024-01-18T09:00:00Z',
        updatedAt: '2024-01-18T09:00:00Z',
        replies: [
          {
            id: '1',
            content: 'Tôi nghĩ AI sẽ giúp cá nhân hóa việc học tập và làm cho giáo dục trở nên hiệu quả hơn. Tuy nhiên, chúng ta cũng cần cân nhắc về tính tương tác con người.',
            author: '2',
            authorName: 'TechWizard',
            createdAt: '2024-01-18T10:30:00Z',
            topicId: '1'
          }
        ],
        tags: ['AI', 'education', 'future'],
        isPinned: true
      }
    ];
  }

  private getDefaultData(): DataStore {
    return {
      users: this.loadUsers(),
      contests: this.loadContests(),
      challenges: this.loadChallenges(),
      contestAttempts: [],
      userProgress: [],
      events: this.loadEvents(),
      forumTopics: this.loadForumTopics(),
      lastUpdated: new Date().toISOString()
    };
  }

  private saveUsers(): void {
    try {
      localStorage.setItem('vaic_users', JSON.stringify(this.data.users));
      console.log('✅ Users data saved successfully');
    } catch (error) {
      console.error('❌ Error saving users data:', error);
    }
  }

  private saveContests(): void {
    try {
      localStorage.setItem('vaic_contests', JSON.stringify(this.data.contests));
      console.log('✅ Contests data saved successfully');
    } catch (error) {
      console.error('❌ Error saving contests data:', error);
    }
  }

  private saveChallenges(): void {
    try {
      localStorage.setItem('vaic_challenges', JSON.stringify(this.data.challenges));
      console.log('✅ Challenges data saved successfully');
    } catch (error) {
      console.error('❌ Error saving challenges data:', error);
    }
  }

  private saveContestAttempts(): void {
    try {
      localStorage.setItem('vaic_contest_attempts', JSON.stringify(this.data.contestAttempts));
      console.log('✅ Contest attempts data saved successfully');
    } catch (error) {
      console.error('❌ Error saving contest attempts data:', error);
    }
  }

  private saveUserProgress(): void {
    try {
      localStorage.setItem('vaic_user_progress', JSON.stringify(this.data.userProgress));
      console.log('✅ User progress data saved successfully');
    } catch (error) {
      console.error('❌ Error saving user progress data:', error);
    }
  }

  private saveEvents(): void {
    try {
      localStorage.setItem('vaic_events', JSON.stringify(this.data.events));
      console.log('✅ Events data saved successfully');
    } catch (error) {
      console.error('❌ Error saving events data:', error);
    }
  }

  private saveForumTopics(): void {
    try {
      localStorage.setItem('vaic_forum_topics', JSON.stringify(this.data.forumTopics));
      console.log('✅ Forum topics data saved successfully');
    } catch (error) {
      console.error('❌ Error saving forum topics data:', error);
    }
  }

  private saveAllData(): void {
    try {
      this.data.lastUpdated = new Date().toISOString();
      
      // Save each data type to separate files
      this.saveUsers();
      this.saveContests();
      this.saveChallenges();
      this.saveContestAttempts();
      this.saveUserProgress();
      this.saveEvents();
      this.saveForumTopics();
      
      // Also save main data store for backup
      localStorage.setItem('vaic_data_store', JSON.stringify(this.data));
      console.log('✅ All data saved successfully at:', this.data.lastUpdated);
    } catch (error) {
      console.error('❌ Error saving data:', error);
    }
  }

  // User methods
  public getUsers(): User[] {
    return this.data.users;
  }

  public addUser(user: User): void {
    this.data.users.push(user);
    this.saveUsers();
    this.saveAllData();
  }

  public updateUser(userId: string, updates: Partial<User>): void {
    const index = this.data.users.findIndex(u => u.id === userId);
    if (index !== -1) {
      this.data.users[index] = { ...this.data.users[index], ...updates };
      this.saveUsers();
      this.saveAllData();
    }
  }

  public deleteUser(userId: string): void {
    this.data.users = this.data.users.filter(u => u.id !== userId);
    this.saveUsers();
    this.saveAllData();
  }

  // Contest methods
  public getContests(): Contest[] {
    // Update contests with their challenges
    return this.data.contests.map(contest => ({
      ...contest,
      challenges: this.data.challenges.filter(c => c.contestId === contest.id)
    }));
  }

  public addContest(contest: Contest): void {
    this.data.contests.push(contest);
    this.saveContests();
    this.saveAllData();
  }

  public updateContest(contestId: string, updates: Partial<Contest>): void {
    const index = this.data.contests.findIndex(c => c.id === contestId);
    if (index !== -1) {
      this.data.contests[index] = { ...this.data.contests[index], ...updates };
      this.saveContests();
      this.saveAllData();
    }
  }

  public deleteContest(contestId: string): void {
    this.data.contests = this.data.contests.filter(c => c.id !== contestId);
    this.data.challenges = this.data.challenges.filter(c => c.contestId !== contestId);
    this.saveContests();
    this.saveChallenges();
    this.saveAllData();
  }

  // Challenge methods
  public getChallenges(): Challenge[] {
    return this.data.challenges;
  }

  public addChallenge(challenge: Challenge): void {
    this.data.challenges.push(challenge);
    this.saveChallenges();
    this.saveAllData();
  }

  public updateChallenge(challengeId: string, updates: Partial<Challenge>): void {
    const index = this.data.challenges.findIndex(c => c.id === challengeId);
    if (index !== -1) {
      this.data.challenges[index] = { ...this.data.challenges[index], ...updates };
      this.saveChallenges();
      this.saveAllData();
    }
  }

  public deleteChallenge(challengeId: string): void {
    this.data.challenges = this.data.challenges.filter(c => c.id !== challengeId);
    this.saveChallenges();
    this.saveAllData();
  }

  // Contest Attempt methods
  public getContestAttempts(): ContestAttempt[] {
    return this.data.contestAttempts;
  }

  public addContestAttempt(attempt: ContestAttempt): void {
    this.data.contestAttempts.push(attempt);
    this.saveContestAttempts();
    this.saveAllData();
  }

  public updateContestAttempt(attemptId: string, updates: Partial<ContestAttempt>): void {
    const index = this.data.contestAttempts.findIndex(a => a.id === attemptId);
    if (index !== -1) {
      this.data.contestAttempts[index] = { ...this.data.contestAttempts[index], ...updates };
      this.saveContestAttempts();
      this.saveAllData();
    }
  }

  // User Progress methods
  public getUserProgress(): UserProgress[] {
    return this.data.userProgress;
  }

  public addUserProgress(progress: UserProgress): void {
    this.data.userProgress.push(progress);
    this.saveUserProgress();
    this.saveAllData();
  }

  // Event methods
  public getEvents(): Event[] {
    return this.data.events;
  }

  public addEvent(event: Event): void {
    this.data.events.push(event);
    this.saveEvents();
    this.saveAllData();
  }

  public updateEvent(eventId: string, updates: Partial<Event>): void {
    const index = this.data.events.findIndex(e => e.id === eventId);
    if (index !== -1) {
      this.data.events[index] = { ...this.data.events[index], ...updates };
      this.saveEvents();
      this.saveAllData();
    }
  }

  public deleteEvent(eventId: string): void {
    this.data.events = this.data.events.filter(e => e.id !== eventId);
    this.saveEvents();
    this.saveAllData();
  }

  // Forum methods
  public getForumTopics(): ForumTopic[] {
    return this.data.forumTopics;
  }

  public addForumTopic(topic: ForumTopic): void {
    this.data.forumTopics.push(topic);
    this.saveForumTopics();
    this.saveAllData();
  }

  public updateForumTopic(topicId: string, updates: Partial<ForumTopic>): void {
    const index = this.data.forumTopics.findIndex(t => t.id === topicId);
    if (index !== -1) {
      this.data.forumTopics[index] = { ...this.data.forumTopics[index], ...updates };
      this.saveForumTopics();
      this.saveAllData();
    }
  }

  public deleteForumTopic(topicId: string): void {
    this.data.forumTopics = this.data.forumTopics.filter(t => t.id !== topicId);
    this.saveForumTopics();
    this.saveAllData();
  }

  // Backup and restore methods
  public exportData(): string {
    return JSON.stringify(this.data, null, 2);
  }

  public exportUserData(): string {
    return JSON.stringify(this.data.users, null, 2);
  }

  public exportContestData(): string {
    return JSON.stringify({
      contests: this.data.contests,
      challenges: this.data.challenges,
      contestAttempts: this.data.contestAttempts
    }, null, 2);
  }

  public exportEventData(): string {
    return JSON.stringify(this.data.events, null, 2);
  }

  public exportForumData(): string {
    return JSON.stringify(this.data.forumTopics, null, 2);
  }

  public importData(jsonData: string): boolean {
    try {
      const importedData = JSON.parse(jsonData);
      this.data = importedData;
      this.saveAllData();
      return true;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  }

  public importUserData(jsonData: string): boolean {
    try {
      const importedUsers = JSON.parse(jsonData);
      this.data.users = importedUsers;
      this.saveUsers();
      this.saveAllData();
      return true;
    } catch (error) {
      console.error('Error importing user data:', error);
      return false;
    }
  }

  public importEventData(jsonData: string): boolean {
    try {
      const importedEvents = JSON.parse(jsonData);
      this.data.events = importedEvents;
      this.saveEvents();
      this.saveAllData();
      return true;
    } catch (error) {
      console.error('Error importing event data:', error);
      return false;
    }
  }

  public importForumData(jsonData: string): boolean {
    try {
      const importedTopics = JSON.parse(jsonData);
      this.data.forumTopics = importedTopics;
      this.saveForumTopics();
      this.saveAllData();
      return true;
    } catch (error) {
      console.error('Error importing forum data:', error);
      return false;
    }
  }

  public resetData(): void {
    // Clear all localStorage data
    localStorage.removeItem('vaic_data_store');
    localStorage.removeItem('vaic_users');
    localStorage.removeItem('vaic_contests');
    localStorage.removeItem('vaic_challenges');
    localStorage.removeItem('vaic_contest_attempts');
    localStorage.removeItem('vaic_user_progress');
    localStorage.removeItem('vaic_events');
    localStorage.removeItem('vaic_forum_topics');
    
    // Reload default data
    this.data = this.loadData();
    this.saveAllData();
    console.log('✅ All data has been reset to default');
  }

  public getDataSummary(): object {
    return {
      users: this.data.users.length,
      contests: this.data.contests.length,
      challenges: this.data.challenges.length,
      contestAttempts: this.data.contestAttempts.length,
      userProgress: this.data.userProgress.length,
      events: this.data.events.length,
      forumTopics: this.data.forumTopics.length,
      lastUpdated: this.data.lastUpdated,
      storageUsed: {
        users: JSON.stringify(this.data.users).length,
        contests: JSON.stringify(this.data.contests).length,
        challenges: JSON.stringify(this.data.challenges).length,
        contestAttempts: JSON.stringify(this.data.contestAttempts).length,
        userProgress: JSON.stringify(this.data.userProgress).length,
        events: JSON.stringify(this.data.events).length,
        forumTopics: JSON.stringify(this.data.forumTopics).length
      }
    };
  }
}

export default DataManager;