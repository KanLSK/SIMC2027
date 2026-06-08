export type ApiHealth = {
  ok: boolean;
  service: string;
  timestamp: string;
};

export type Profile = {
  id: string;
  email: string;
  fullName: string | null;
  stripeCustomerId: string | null;
  createdAt: string;
  updatedAt: string;
};
