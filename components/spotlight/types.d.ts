interface ActionData {
  slug: string;
  image: string;
  title: string;
  description: string;
  onTrigger: () => void;
  price?: number;
}
