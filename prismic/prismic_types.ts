/** Text types */
export const textStyles = [
  'heading1',
  'heading2',
  'paragraph',
  'list-item',
  'o-list-item',
] as const;
export type TextStyles = typeof textStyles[number];
export type BaseText<T extends TextStyles> = {
  type: T;
  text: string;
  spans: {
    start: number;
    end: number;
    type: 'strong' | 'em';
  }[];
};
export type Title = BaseText<'heading1'>;
export type Subtitle = BaseText<'heading2'>;
export type Paragraph = BaseText<'paragraph'>;
export type ListItem = BaseText<'list-item'>;
export type OListItem = BaseText<'o-list-item'>;
export type Image = {
  type: 'image';
  url: string;
  alt: string;
  dimensions: {
    width: number;
    height: number;
  };
};

export type RichtextItem = Title | Subtitle | Paragraph | ListItem | OListItem | Image;
export type Richtext = {
  type: 'richtext';
  paragraphs: RichtextItem[];
};

/** Custom types */
export type Gallery = {
  type: 'gallery';
  images: Image[];
};
export type SectionStart = {
  type: 'section_start';
  sectionTitle: Title;
  sectionText: Richtext[];
};
export type StaffCard = {
  type: 'staff_card';
  profilePicture: Image;
  name: string;
  username: string;
  role: string;
  description: Richtext;
  rpStyle: 'rp' | 'casual_rp';
}
export type Slice = Gallery | SectionStart | StaffCard;

export type FlexiPage = {
  type: 'flexi_page';
  id: string;
  pageTitle: Title;
  slices: Slice[];
};

export type PrismicTypes = FlexiPage;
