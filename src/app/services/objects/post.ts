export class Post{
  post_id: number;
  username: string;
  title: string;
  text: string;
  attachment?: string = undefined;
  likes: number;
  date_created: string;
  last_updated: string;
}

export class newPost{
  username: string;
  title: string;
  text: string;
  attach: string = null;
}
