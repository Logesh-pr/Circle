export interface Post {
  _id: string;
  author: {
    name: string;
    username: string;
    avator?: string;
  };
  content: string;
  images?: string[];
  likesCount: number;
  commentsCount: number;
  isLiked: boolean;
  bookmarkCount: number;
  isBookmarked: boolean;
  createdAt: string;
}
