'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import ProjectNav from '@/components/ProjectNav';

type Category = 'Fitness' | 'Commercial' | 'Cultural' | 'Beauty' | 'Editorial' | 'Publications' | 'Digitals' | 'Swimsuit' | 'Intimate' | 'Film' | 'Portraits';

interface Credits {
  photographer?: string;
  photographerLink?: string;
  mua?: string;
  muaLink?: string;
  hair?: string;
  stylist?: string;
  stylistLink?: string;
}

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: Category;
  tags?: Category[];
  styleFilters?: StyleFilter[];
  height: 'short' | 'medium' | 'tall';
  border?: 'white' | 'black';
  objectPosition?: string;
  scale?: number;
  credits?: Credits;
}

const CATEGORY_TABS = ['All', 'Digitals', 'Editorial', 'Swimwear', 'Commercial', 'Cultural', 'Fitness', 'Beauty', 'Intimate'] as const;
type CategoryTab = (typeof CATEGORY_TABS)[number];

type StyleFilter = 'Film' | 'Portraits' | 'B&W' | 'Publications' | 'Fashion' | 'Makeup & Hair' | 'Accessories' | 'Full Body';
const STYLE_FILTERS: StyleFilter[] = ['Film', 'Portraits', 'B&W', 'Publications', 'Fashion', 'Makeup & Hair', 'Accessories', 'Full Body'];

const heightClasses: Record<GalleryImage['height'], string> = {
  short: 'h-[200px] md:h-[250px]',
  medium: 'h-[280px] md:h-[350px]',
  tall: 'h-[360px] md:h-[450px]',
};

const CATEGORIES: Category[] = ['Digitals', 'Editorial', 'Commercial', 'Swimsuit', 'Beauty', 'Intimate', 'Cultural', 'Fitness'];

const categoryNumbers: Record<Category, string> = {
  Fitness: '01',
  'Commercial': '02',
  Cultural: '03',
  Beauty: '04',
  Editorial: '05',
  Publications: '06',
  Digitals: '07',
  Swimsuit: '08',
  Intimate: '09',
  Film: '10',
  Portraits: '11',
};

const galleryImages: GalleryImage[] = [
  // Digitals
  { id: 'dig-1', src: '/images/modelling/digitals1.jpg', alt: 'Digitals comp', category: 'Digitals', styleFilters: ['Film', 'Fashion', 'Portraits'], credits: { photographer: 'Kabir O.', mua: 'Birgitta W. & Tatyana K.', muaLink: 'http://www.birgittamakeupartistry.com', hair: 'Angela D. & Crystal M.', stylist: 'Shanice W.' },   height: 'medium' },
  { id: 'dig-2', src: '/images/modelling/digitals2.jpg', alt: 'Digitals headshot', category: 'Digitals',styleFilters: ['Film', 'Fashion', 'Full Body'], credits: { photographer: 'Kabir O.', mua: 'Birgitta W. & Tatyana K.', muaLink: 'http://www.birgittamakeupartistry.com', hair: 'Angela D. & Crystal M.', stylist: 'Shanice W.' },  height: 'tall' },
  { id: 'dig-3', src: '/images/modelling/digitals3.jpg', alt: 'Digitals studio', category: 'Digitals', height: 'medium', styleFilters: ['Portraits', 'Accessories'], credits: {photographer: 'Christian Z.'}},
  { id: 'dig-4', src: '/images/modelling/digitals4.jpg', alt: 'Digitals full body', category: 'Digitals', styleFilters: ['Portraits', 'Accessories'], credits: {photographer: 'Kirti S.'}, height: 'tall' },
  // Editorial — Row 1: Color (2,3,4,5)
  { id: 'edit-2', src: '/images/modelling/editorial2.jpg', alt: 'Editorial portrait', category: 'Editorial', styleFilters: ['Makeup & Hair', 'Fashion', 'Full Body'], credits: { photographer: 'Kabir O.', mua: 'Birgitta W. & Tatyana K.', muaLink: 'http://www.birgittamakeupartistry.com', hair: 'Angela D. & Crystal M.', stylist: 'Shanice W.' }, height: 'tall' },
  { id: 'edit-3', src: '/images/modelling/editorial3.jpg', alt: 'Editorial concept', category: 'Editorial', styleFilters: ['Makeup & Hair', 'Fashion', 'Full Body'], credits: { photographer: 'Julie M.', mua: 'Angelina L.', hair: 'Crystal M.' }, height: 'tall' },
  { id: 'edit-4', src: '/images/modelling/editorial4.jpg', alt: 'Editorial styling', category: 'Editorial', styleFilters: ['Film', 'Fashion', 'Full Body'], credits: { photographer: 'Amara A.', photographerLink: 'https://www.arw.photos', mua: 'Angelina L.', hair: 'Crystal M.' }, height: 'tall' },
  { id: 'edit-5', src: '/images/modelling/editorial5.jpg', alt: 'Editorial outdoor', category: 'Editorial', styleFilters: ['Accessories', 'Fashion', 'Full Body'], credits: { photographer: 'Hooman Z.', mua: 'Sandhya S.', hair: 'Crystal M.', stylist: 'Shiraz K.' }, height: 'tall' },
  // Editorial — Row 2: B&W (1,6,7,8)
  { id: 'edit-1', src: '/images/modelling/editorial1.jpg', alt: 'Editorial shoot', category: 'Editorial', styleFilters: ['Accessories', 'Fashion', 'B&W'], credits: { photographer: 'Kabir O.', mua: 'Birgitta W. & Tatyana K.', muaLink: 'http://www.birgittamakeupartistry.com', hair: 'Angela D. & Crystal M.', stylist: 'Shanice W.' }, height: 'tall' },
  { id: 'edit-6', src: '/images/modelling/editorial6.jpg', alt: 'Editorial studio', category: 'Editorial', styleFilters: ['Full Body', 'Fashion', 'B&W'], credits: { photographer: 'Shreyas H.', mua: 'Birgitta W. & Diane K.', muaLink: 'http://www.birgittamakeupartistry.com', hair: 'Angela D.', stylist: 'Roxsana B.', stylistLink: 'https://www.behance.net/roxsanabernal' }, height: 'tall' },
  { id: 'edit-7', src: '/images/modelling/editorial7.jpg', alt: 'Editorial creative', category: 'Editorial', styleFilters: ['Accessories', 'Fashion', 'B&W'], credits: { photographer: 'Shreyas H.', mua: 'Birgitta W. & Diane K.', muaLink: 'http://www.birgittamakeupartistry.com', hair: 'Angela D.', stylist: 'Roxsana B.', stylistLink: 'https://www.behance.net/roxsanabernal' }, height: 'tall' },
  { id: 'edit-8', src: '/images/modelling/editorial8.jpg', alt: 'Editorial artistic', category: 'Editorial', styleFilters: ['Full Body', 'Makeup & Hair', 'B&W'], credits: { photographer: 'Mattieau St.Cyr', photographerLink: 'https://www.manikkrealm.com', mua: 'Birgitta W. & Tatyana K.', muaLink: 'http://www.birgittamakeupartistry.com', hair: 'Angela D. & Crystal M.', stylist: 'Shanice W.' }, height: 'tall' },
  // Editorial — Row 3: 11,9,16,14
  { id: 'edit-11', src: '/images/modelling/editorial11.jpg', alt: 'Editorial film', category: 'Editorial', styleFilters: ['Film', 'Fashion', 'Accessories'], credits: { photographer: 'Aamer S.'},  height: 'tall' },
  { id: 'edit-9', src: '/images/modelling/editorial9.JPG', alt: 'Editorial fashion', category: 'Editorial', styleFilters: ['Fashion', 'Makeup & Hair', 'Accessories'], credits: { photographer: 'Maxwell G. ', mua: 'Angelina L', hair: 'Crystal M.', stylist: 'Shanice W.' }, height: 'tall' },
  { id: 'edit-16', src: '/images/modelling/editorial16.jpg', alt: 'Editorial artistic', category: 'Editorial', styleFilters: ['Full Body', 'Makeup & Hair', 'Film'], credits: { photographer: 'Mattieau St.Cyr', photographerLink: 'https://www.manikkrealm.com', mua: 'Birgitta W. & Tatyana K.', muaLink: 'http://www.birgittamakeupartistry.com', hair: 'Angela D. & Crystal M.', stylist: 'Shanice W.' }, height: 'tall' },
  { id: 'edit-14', src: '/images/modelling/editorial14.jpg', alt: 'Editorial cinematic', category: 'Editorial', styleFilters: ['Accessories', 'Makeup & Hair', 'Publications' ], credits: { photographer: 'Amara A.', photographerLink: 'https://www.arw.photos', mua: 'Angelina L.', hair: 'Crystal M.', stylist: 'Maryam S.' }, height: 'tall' },
  // Editorial — Row 4: 13,15,12
  { id: 'edit-13', src: '/images/modelling/editorial13.jpg', alt: 'Editorial scene', category: 'Editorial', styleFilters: ['Film', 'Makeup & Hair', 'B&W'], credits: { photographer: 'Mattieau St.Cyr', photographerLink: 'https://www.manikkrealm.com', mua: 'Birgitta W. & Tatyana K.', muaLink: 'http://www.birgittamakeupartistry.com', hair: 'Angela D. & Crystal M.', stylist: 'Shanice W.' }, height: 'medium' },
  { id: 'edit-15', src: '/images/modelling/editorial15.jpg', alt: 'Editorial natural', category: 'Editorial', styleFilters: ['Portraits', 'Makeup & Hair', 'B&W'], credits: { photographer: 'Shreyas H.', mua: 'Birgitta W. & Diane K.', muaLink: 'http://www.birgittamakeupartistry.com', hair: 'Angela D.', stylist: 'Roxsana B.', stylistLink: 'https://www.behance.net/roxsanabernal' }, height: 'tall' },
  { id: 'edit-12', src: '/images/modelling/editorial12.jpg', alt: 'Editorial still', category: 'Editorial', styleFilters: ['Film', 'Makeup & Hair', 'B&W'], credits: { photographer: 'Mattieau St.Cyr', photographerLink: 'https://www.manikkrealm.com', mua: 'Birgitta W. & Tatyana K.', muaLink: 'http://www.birgittamakeupartistry.com', hair: 'Angela D. & Crystal M.', stylist: 'Shanice W.' }, height: 'medium' },
  { id: 'edit-10', src: '/images/modelling/editorial10.JPG', alt: 'Editorial lifestyle', category: 'Editorial', styleFilters: ['Makeup & Hair', 'Fashion', 'Full Body'], credits: { photographer: 'Kabir O.', mua: 'Birgitta W. & Tatyana K.', muaLink: 'http://www.birgittamakeupartistry.com', hair: 'Angela D. & Crystal M.', stylist: 'Shanice W.' }, height: 'medium' },
   // Commercial
  { id: 'comm-1', src: '/images/modelling/commercial1.jpg', alt: 'Commercial shoot', category: 'Commercial', styleFilters: ['Accessories', 'Fashion', 'Makeup & Hair'], credits: { photographer: 'Amara A.', photographerLink: 'https://www.arw.photos', mua: 'Khushi C. & Elisa S.', hair: 'Crystal M. & Darya K.', stylist: 'Roxsana B.', stylistLink: 'https://www.behance.net/roxsanabernal' }, height: 'tall' },
  { id: 'comm-2', src: '/images/modelling/commercial2.jpg', alt: 'Commercial campaign', category: 'Commercial', styleFilters: ['Accessories', 'Fashion', 'Full Body'], credits: { photographer: 'Amara A.', photographerLink: 'https://www.arw.photos', mua: 'Khushi C. & Elisa S.', hair: 'Crystal M. & Darya K.'}, height: 'medium' },
  { id: 'comm-3', src: '/images/modelling/commercial3.jpg', alt: 'Commercial lifestyle', category: 'Commercial', styleFilters: ['Full Body', 'Fashion', 'Makeup & Hair'], credits: { photographer: 'Luis Q.', mua: 'Sarbjot G.', hair: 'Sarbjot G.'}, height: 'tall' },
  { id: 'comm-4', src: '/images/modelling/commercial4.jpg', alt: 'Commercial brand', category: 'Commercial', styleFilters: ['Accessories', 'Fashion', 'Makeup & Hair'], credits: { photographer: 'Luis Q.', mua: 'Sarbjot G.', hair: 'Sarbjot G.'}, height: 'medium' },
  // Row 2 - Commercial: 5,6,7,8
  { id: 'comm-5', src: '/images/modelling/commercial5.jpg', alt: 'Commercial product', category: 'Commercial', styleFilters: ['Accessories', 'Portraits', 'Makeup & Hair'], credits: { photographer: 'Luis Q.', mua: 'Sarbjot G.', hair: 'Sarbjot G.'}, height: 'tall' },
  { id: 'comm-6', src: '/images/modelling/commercial6.jpg', alt: 'Commercial editorial', category: 'Commercial', styleFilters: ['Accessories', 'Portraits', 'Makeup & Hair'], credits: { photographer: 'Luis Q.', mua: 'Sarbjot G.', hair: 'Sarbjot G.'}, height: 'tall' },
  { id: 'comm-7', src: '/images/modelling/commercial7.jpg', alt: 'Commercial creative', category: 'Commercial', styleFilters: ['Full Body', 'Fashion', 'Makeup & Hair'], credits: { photographer: 'Luis Q.', mua: 'Sarbjot G.', hair: 'Sarbjot G.'}, height: 'tall' },
  { id: 'comm-8', src: '/images/modelling/commercial8.JPG', alt: 'Commercial lifestyle', category: 'Commercial', styleFilters: ['Accessories', 'Fashion', 'Makeup & Hair'], credits: { photographer: 'Amara A.', photographerLink: 'https://www.arw.photos', mua: 'Khushi C. & Elisa S.', hair: 'Crystal M. & Darya K.'}, height: 'medium' },
  // Swimsuit
  { id: 'swim-1', src: '/images/modelling/swimwear1.jpg', alt: 'Swimsuit shoot', category: 'Swimsuit', styleFilters: ['Accessories', 'Fashion', 'Portraits'], credits: { photographer: 'Luis Q.'}, height: 'tall' },
  { id: 'swim-2', src: '/images/modelling/swimwear2.jpg', alt: 'Swimsuit editorial', category: 'Swimsuit', styleFilters: ['Accessories', 'Fashion', 'Full Body'], credits: { photographer: 'Luis Q.'}, height: 'medium', objectPosition: '20% center' },
  { id: 'swim-3', src: '/images/modelling/swimwear3.jpg', alt: 'Swimsuit campaign', category: 'Swimsuit', styleFilters: ['Accessories', 'Fashion', 'Full Body'], credits: { photographer: 'Luis Q.'}, height: 'medium', objectPosition: '20% center' },
  { id: 'swim-4', src: '/images/modelling/swimwear4.jpg', alt: 'Swimsuit lifestyle', category: 'Swimsuit', styleFilters: ['Accessories', 'Fashion', 'Full Body'], credits: { photographer: 'Luis Q.'}, height: 'tall'},
  // Beauty - Row 1 - 1,2,3,4
  { id: 'beau-1', src: '/images/modelling/beauty1.jpeg', alt: 'Beauty closeup', category: 'Beauty', styleFilters: ['Accessories', 'Makeup & Hair', 'Portraits'], credits: { photographer: 'Josephine M.', mua: 'Angelina L.', hair: 'Crystal M.'}, height: 'medium'},
  { id: 'beau-2', src: '/images/modelling/beauty2.jpg', alt: 'Beauty glam', category: 'Beauty', styleFilters: ['Accessories', 'Makeup & Hair', 'Portraits'], credits: { photographer: 'Amara A.', photographerLink: 'https://www.arw.photos', mua: 'Angelina L.', hair: 'Crystal M.', stylist: 'Maryam S.'}, height: 'medium'},
  { id: 'beau-3', src: '/images/modelling/beauty3.jpg', alt: 'Beauty editorial', category: 'Beauty', styleFilters: ['Accessories', 'Portraits'], credits: { photographer: 'Aamer S.'}, height: 'medium'},
  { id: 'beau-4', src: '/images/modelling/beauty4.jpg', alt: 'Beauty portrait', category: 'Beauty', styleFilters: ['Accessories', 'Portraits', 'Makeup & Hair'], credits: { photographer: 'Naga', mua: 'Angelina L. & Khushi C.', hair: 'Crystal M. & Liah W.', stylist: 'Shanice W.' }, height: 'tall' },
  // Row 2 - Beauty: 5,6,7,8
  { id: 'beau-5', src: '/images/modelling/beauty5.JPG', alt: 'Beauty artistic', category: 'Beauty', styleFilters: [ 'Makeup & Hair', 'Portraits'], credits: { photographer: 'Justin A.', photographerLink: 'https://www.vogue.com/photovogue/photographers/75863', mua: 'Khadija O.'}, height: 'tall'},
  { id: 'beau-6', src: '/images/modelling/beauty6.jpg', alt: 'Beauty creative', category: 'Beauty',styleFilters: ['Film', 'Makeup & Hair', 'Accessories'], credits: { photographer: 'Robert', mua: 'Birgitta W.', muaLink: 'http://www.birgittamakeupartistry.com', hair: 'Liah W. & Holly H.'}, height: 'medium', objectPosition: '85% center' },
  { id: 'beau-7', src: '/images/modelling/beauty7.jpg', alt: 'Beauty glam', category: 'Beauty', styleFilters: ['Accessories', 'Portraits', 'Makeup & Hair'], credits: { photographer: 'Mattieau St.Cyr', photographerLink: 'https://www.manikkrealm.com', mua: 'Birgitta W. & Tatyana K.', muaLink: 'http://www.birgittamakeupartistry.com', hair: 'Angela D. & Crystal M.', stylist: 'Shanice W.' }, height: 'tall' },
  { id: 'beau-10', src: '/images/modelling/beauty10.jpg', alt: 'Beauty editorial', category: 'Beauty', styleFilters: ['Makeup & Hair', 'Full Body', 'Accessories'], credits: { photographer: 'Julie M.', mua: 'Angelina L.', hair: 'Crystal M. & Liah W.', stylist: 'Shanice W.'}, height: 'tall' },
  // Row 3 - Beauty: 9,10,11,12
  { id: 'beau-11', src: '/images/modelling/beauty11.jpg', alt: 'Beauty lifestyle', category: 'Beauty', styleFilters: ['Makeup & Hair', 'Portraits', 'B&W'], credits: { photographer: 'Dakksh N.', mua: 'Khushi C.', hair: 'Crystal M.', stylist: 'Shanice W.' }, height: 'tall' },
  { id: 'beau-12', src: '/images/modelling/beauty12.jpg', alt: 'Beauty portrait', category: 'Beauty', styleFilters: ['B&W', 'Portraits', 'Makeup & Hair'], credits: { photographer: 'Mattieau St.Cyr', photographerLink: 'https://www.manikkrealm.com', mua: 'Birgitta W. & Tatyana K.', muaLink: 'http://www.birgittamakeupartistry.com', hair: 'Angela D. & Crystal M.', stylist: 'Shanice W.' }, height: 'tall' },
  { id: 'beau-13', src: '/images/modelling/beauty13.jpg', alt: 'Beauty portrait', category: 'Beauty', styleFilters: ['B&W', 'Full Body', 'Fashion'], credits: { photographer: 'Shreyas H.', mua: 'Birgitta W. & Diane K.', muaLink: 'http://www.birgittamakeupartistry.com', hair: 'Angela D.', stylist: 'Roxsana B.', stylistLink: 'https://www.behance.net/roxsanabernal' }, height: 'tall' },
  { id: 'beau-14', src: '/images/modelling/beauty14.jpg', alt: 'Beauty portrait', category: 'Beauty', styleFilters: ['B&W', 'Portraits', 'Fashion'], credits: { photographer: 'Shreyas H.', mua: 'Birgitta W. & Diane K.', muaLink: 'http://www.birgittamakeupartistry.com', hair: 'Angela D.', stylist: 'Roxsana B.', stylistLink: 'https://www.behance.net/roxsanabernal' }, height: 'tall' },
  // Intimate - Row 1 - 1,2,3,4
  { id: 'intm-1', src: '/images/modelling/intimate1.jpg', alt: 'Intimate shoot', category: 'Intimate', styleFilters: ['Makeup & Hair'], credits: { photographer: 'Mattieau St.Cyr', photographerLink: 'https://www.manikkrealm.com', mua: 'Birgitta W. & Tatyana K.', muaLink: 'http://www.birgittamakeupartistry.com', hair: 'Angela D. & Crystal M.', stylist: 'Shanice W.' }, height: 'tall' },
  { id: 'intm-2', src: '/images/modelling/intimate2.jpg', alt: 'Intimate portrait', category: 'Intimate', styleFilters: ['Film', 'Fashion', 'Full Body'], credits: { photographer: 'Amara A.', photographerLink: 'https://www.arw.photos', mua: 'Khushi C. & Elisa S.', hair: 'Crystal M. & Darya K.', stylist: 'Samantha C.' }, height: 'medium' },
  { id: 'intm-3', src: '/images/modelling/intimate3.jpg', alt: 'Intimate studio', category: 'Intimate', styleFilters: ['Film', 'Fashion', 'Full Body'], credits: { photographer: 'Amara A.', photographerLink: 'https://www.arw.photos', mua: 'Khushi C. & Elisa S.', hair: 'Crystal M. & Darya K.', stylist: 'Samantha C.' }, height: 'tall' },
  { id: 'intm-4', src: '/images/modelling/intimate4.jpg', alt: 'Intimate creative', category: 'Intimate', styleFilters: ['Portraits'], credits: { photographer: 'Aamer S.'},  height: 'tall' },
  // Row 2 - Intimate: 5,6,7,8
  { id: 'intm-6', src: '/images/modelling/intimate6.jpg', alt: 'Intimate artistic', category: 'Intimate', styleFilters: ['Full Body'], credits: { photographer: 'Aamer S.'},  height: 'tall' },
  { id: 'intm-7', src: '/images/modelling/intimate7.jpg', alt: 'Intimate lifestyle', category: 'Intimate', styleFilters: ['Portraits'], credits: { photographer: 'Aamer S.'},  height: 'tall' },
  { id: 'intm-8', src: '/images/modelling/intimate8.jpg', alt: 'Intimate editorial', category: 'Intimate', styleFilters: ['Full Body'], credits: { photographer: 'Aamer S.'},  height: 'medium' },
  { id: 'intm-9', src: '/images/modelling/intimate9.JPG', alt: 'Intimate artistic', category: 'Intimate', styleFilters: ['Portraits'], credits: { photographer: 'Josephine M.', mua: 'Angelina L', hair: 'Crystal M.'},  height: 'tall' },
  // Cultural - Row 1 - 1,2,3,4
  { id: 'cult-1', src: '/images/modelling/cultural1.jpg', alt: 'Cultural shoot', category: 'Cultural', styleFilters: ['Accessories', 'Fashion', 'Full Body'], credits: { photographer: 'Hooman Z.', mua: 'Sandhya S.', hair: 'Crystal M.', stylist: 'Shiraz K.' }, height: 'tall' },
  { id: 'cult-2', src: '/images/modelling/cultural2.jpg', alt: 'Cultural portrait', category: 'Cultural', styleFilters: ['Accessories', 'Portraits', 'B&W'], credits: { photographer: 'Justin A.', photographerLink: 'https://www.vogue.com/photovogue/photographers/75863',}, height: 'tall' },
  { id: 'cult-3', src: '/images/modelling/cultural3.jpg', alt: 'Cultural editorial', category: 'Cultural', styleFilters: ['Accessories', 'Makeup & Hair', 'Portraits'], credits: { photographer: 'Rouge Studios', mua: 'Sarbjot G.', hair: 'Sarbjot G.'}, height: 'tall' },
  { id: 'cult-4', src: '/images/modelling/cultural4.jpg', alt: 'Cultural creative', category: 'Cultural', styleFilters: ['Accessories', 'Portraits', 'B&W'], credits: { photographer: 'Justin A.', photographerLink: 'https://www.vogue.com/photovogue/photographers/75863',}, height: 'tall' },
  // Row 2 - Cultural: 5,6,7,8
  { id: 'cult-5', src: '/images/modelling/cultural5.jpg', alt: 'Cultural artistic', category: 'Cultural', styleFilters: ['Accessories', 'Portraits', 'B&W'], credits: { photographer: 'Justin A.', photographerLink: 'https://www.vogue.com/photovogue/photographers/75863',}, height: 'tall' },
  { id: 'cult-6', src: '/images/modelling/cultural6.jpg', alt: 'Cultural lifestyle', category: 'Cultural', styleFilters: ['Fashion', 'Makeup & Hair', 'Full Body'], credits: { photographer: 'Rouge Studios', mua: 'Sarbjot G.', hair: 'Sarbjot G.'}, height: 'tall' },
  { id: 'cult-7', src: '/images/modelling/cultural7.JPG', alt: 'Cultural heritage', category: 'Cultural', styleFilters: ['Accessories', 'Makeup & Hair', 'Portraits'], credits: { photographer: 'Rouge Studios',}, height: 'tall' },
  { id: 'cult-8', src: '/images/modelling/cultural8.jpg', alt: 'Cultural traditional', category: 'Cultural', styleFilters: ['Full Body', 'Makeup & Hair', 'Fashion'], credits: { photographer: 'Justin A.', photographerLink: 'https://www.vogue.com/photovogue/photographers/75863',}, height: 'tall' },
  // Fitness - 1,2
  { id: 'fit-1', src: '/images/modelling/fitness1.jpg', alt: 'Fitness shoot', category: 'Fitness', styleFilters: ['Full Body', 'Fashion', 'Makeup & Hair'], credits: {photographer: 'Luis Q', mua: 'Sarbjot G.', hair: 'Sarbjot G.',}, height: 'tall' },
  { id: 'fit-2', src: '/images/modelling/fitness2.jpg', alt: 'Fitness athletic', category: 'Fitness', styleFilters: ['Accessories', 'Fashion', 'Makeup & Hair'], credits: { photographer: 'Luis Q', mua: 'Sarbjot G.', hair: 'Sarbjot G.',}, height: 'medium' },
];

function getBorderClass(border?: 'white' | 'black') {
  if (border === 'white') return 'p-2 bg-white';
  if (border === 'black') return 'p-2 bg-black';
  return '';
}

const HAIR_LINKS: Record<string, string> = {
  'Crystal M.': 'https://www.dulcehairco.com',
  'Darya K.': 'https://www.instagram.com/deevinehair',
};

function renderHairCredits(hair: string) {
  const parts = hair.split(' & ');
  return parts.map((name, i) => {
    const trimmedName = name.trim();
    const link = HAIR_LINKS[trimmedName];
    return (
      <span key={i}>
        {i > 0 && ' & '}
        {link ? (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-[#FD9635] transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            {trimmedName}
          </a>
        ) : (
          trimmedName
        )}
      </span>
    );
  });
}

export default function Modelling() {
  const [activeCategory, setActiveCategory] = useState<CategoryTab>('All');
  const [activeStyles, setActiveStyles] = useState<StyleFilter[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);

  const toggleStyle = (style: StyleFilter) => {
    setActiveStyles(prev =>
      prev.includes(style) ? prev.filter(s => s !== style) : [...prev, style]
    );
  };

  const filteredImages = useMemo(() => {
    let imgs = galleryImages;
    if (activeCategory !== 'All') {
      imgs = imgs.filter(img =>
        img.category === activeCategory || (img.tags && img.tags.includes(activeCategory as Category))
      );
    }
    if (activeStyles.length > 0) {
      imgs = imgs.filter(img =>
        img.styleFilters && activeStyles.some(s => img.styleFilters!.includes(s))
      );
    }
    return imgs;
  }, [activeCategory, activeStyles]);

  return (
    <main className="min-h-screen bg-black text-white">
      <ProjectNav title="KIRTI SAXENA" onMenuToggle={setIsMenuOpen} />

      {/* Social Media Icons at Navigation Level */}
      <AnimatePresence>
        {!isMenuOpen && (
          <motion.div
            key="social-media"
            className="w-full pt-24 md:pt-32"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-center">
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-5 md:gap-8">
                  <motion.div className="flex flex-col items-center gap-1" whileHover={{ scale: 1.1, y: -3 }} whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                    <motion.a href="https://instagram.com/kirti.sxena" target="_blank" rel="noopener noreferrer" className="group">
                      <svg className="w-6 h-6 text-gray-400 group-hover:text-pink-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </motion.a>
                    <span className="text-xs text-gray-500">2K</span>
                  </motion.div>
                  <motion.div className="flex flex-col items-center gap-1" whileHover={{ scale: 1.1, y: -3 }} whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                    <motion.a href="https://tiktok.com/@kirtisxena" target="_blank" rel="noopener noreferrer" className="group">
                      <svg className="w-6 h-6 text-gray-400 group-hover:text-red-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                      </svg>
                    </motion.a>
                    <span className="text-xs text-gray-500">1.2K</span>
                  </motion.div>
                  <motion.div className="flex flex-col items-center gap-1" whileHover={{ scale: 1.1, y: -3 }} whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                    <motion.a href="https://youtube.com/@kirtisxena" target="_blank" rel="noopener noreferrer" className="group">
                      <svg className="w-6 h-6 text-gray-400 group-hover:text-red-500 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    </motion.a>
                    <span className="text-xs text-gray-500">&gt;1K</span>
                  </motion.div>
                  <motion.div className="flex flex-col items-center gap-1" whileHover={{ scale: 1.1, y: -3 }} whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                    <motion.a href="https://x.com/kirtisxena" target="_blank" rel="noopener noreferrer" className="group">
                      <svg className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </motion.a>
                    <span className="text-xs text-gray-500">&gt;1K</span>
                  </motion.div>
                  <motion.div className="flex flex-col items-center gap-1" whileHover={{ scale: 1.1, y: -3 }} whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                    <motion.a href="https://www.facebook.com/profile.php?id=61569017578092" target="_blank" rel="noopener noreferrer" className="group">
                      <svg className="w-6 h-6 text-gray-400 group-hover:text-blue-600 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </motion.a>
                    <span className="text-xs text-gray-500">&gt;1K</span>
                  </motion.div>
                </div>

                {/* Engagement Stats */}
                <div className="mt-5 pt-4 border-t border-white/10 flex flex-col md:flex-row items-center gap-4 md:gap-8">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-sm md:text-base text-gray-300 tracking-wide font-medium">IG @kirti.sxena</span>
                      <span className="text-xs md:text-sm text-gray-500">≈ 2K</span>
                      <span className="text-xs md:text-sm text-[#FD9635] font-semibold">10.5%</span>
                    </div>
                    <span className="text-xs text-gray-500 mt-1">195 avg likes · 15 comments/post</span>
                  </div>
                  <div className="hidden md:block w-px h-8 bg-white/10"></div>
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-sm md:text-base text-gray-300 tracking-wide font-medium">TT @kirtisxena</span>
                      <span className="text-xs md:text-sm text-gray-500">≈ 1.2K</span>
                      <span className="text-xs md:text-sm text-[#FD9635] font-semibold">5.5%</span>
                    </div>
                    <span className="text-xs text-gray-500 mt-1">905 avg likes · 6 comments/post</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pt-8 md:pt-12 px-4 md:px-8 pb-20">
        <div className="max-w-7xl mx-auto">

          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-light mb-4 md:mb-6">MODEL</h1>
            <p className="text-base md:text-xl text-gray-400 max-w-2xl mx-auto px-2">
              After being scouted on an airplane after wrestling a world championship when I was 16,
              I got signed in Toronto, Canada at age 19.
            </p>

            {/* Video */}
            <div className="mt-6 md:mt-10 max-w-3xl mx-auto px-2">
              <p className="text-[10px] md:text-xs text-gray-500 mb-2 text-center">unmute to hear audio</p>
              <video
                autoPlay
                muted
                controls
                loop
                playsInline
                className="w-full"
              >
                <source src="/images/modelling/Kirti_video.MP4" type="video/mp4" />
              </video>
            </div>
          </motion.div>

          {/* Dimensions */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-14"
          >
            <div className="flex flex-wrap justify-center gap-x-6 md:gap-x-12 gap-y-4 md:gap-y-5">
              {[
                { label: 'Height', value: '5\'9"' },
                { label: 'Weight', value: '130 lbs' },
                { label: 'Waist', value: '24"' },
                { label: 'Eyes', value: 'Brown' },
                { label: 'Hair', value: 'Dark Brown' },
                { label: 'Shoe Size', value: '8.5' },
                { label: 'Bust', value: '34 C' },
                { label: 'Leg Length', value: '39"' },
              ].map((dim) => (
                <div key={dim.label} className="flex flex-col items-center min-w-[70px]">
                  <span className="text-[10px] md:text-xs text-[#FD9635] uppercase tracking-[0.15em] md:tracking-[0.2em] font-bold">{dim.label}</span>
                  <span className="text-sm md:text-base text-white mt-1">{dim.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-12"
          >
            {/* Categories */}
            <div className="flex flex-col items-center gap-2 mb-4">
              <span className="text-xs md:text-sm text-[#FD9635] uppercase tracking-widest font-bold">Categories</span>
              <div className="flex flex-wrap justify-center gap-1.5 md:gap-2">
                {CATEGORY_TABS.map((tab) => (
                  <motion.button
                    key={tab}
                    onClick={() => setActiveCategory(tab)}
                    className={`px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-light border transition-all duration-300 ${
                      activeCategory === tab
                        ? 'bg-[#FD9635] border-[#FD9635] text-black'
                        : 'border-white/20 text-gray-400 hover:border-[#FD9635] hover:text-[#FD9635]'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {tab}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Style Filters */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs md:text-sm text-[#FD9635] uppercase tracking-widest font-bold">Filters</span>
              <div className="flex flex-wrap justify-center gap-1.5 md:gap-2">
                {STYLE_FILTERS.map((filter) => (
                  <motion.button
                    key={filter}
                    onClick={() => toggleStyle(filter)}
                    className={`px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-light border transition-all duration-300 ${
                      activeStyles.includes(filter)
                        ? 'bg-white border-white text-black'
                        : 'border-white/20 text-gray-400 hover:border-white hover:text-white'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {filter}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Category Sections */}
          {(activeCategory === 'All' ? CATEGORIES : [activeCategory as Category]).map((cat) => {
            let catImages = galleryImages.filter(img =>
              img.category === cat || (img.tags && img.tags.includes(cat))
            );
            if (activeStyles.length > 0) {
              catImages = catImages.filter(img =>
                img.styleFilters && activeStyles.some(s => img.styleFilters!.includes(s))
              );
            }
            if (catImages.length === 0) return null;
            return (
              <div key={cat} className="mb-12 flex">
                {/* Vertical category label on the left */}
                <div className="hidden md:flex items-center justify-center w-10 mr-4 flex-shrink-0">
                  <span
                    className="text-lg tracking-[0.3em] text-[#FD9635] uppercase font-bold whitespace-nowrap"
                    style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                  >
                    {cat}
                  </span>
                </div>
                <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {catImages.map((image, index) => (
                    <motion.div
                      key={image.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{
                        duration: 0.3,
                        delay: Math.min(index * 0.03, 0.15),
                        ease: "easeOut",
                      }}
                      className="aspect-[3/4]"
                    >
                      <div
                        className={`group ${getBorderClass(image.border)} relative cursor-pointer h-full`}
                        onClick={() => setLightboxImage(image)}
                      >
                        <div className="relative w-full h-full overflow-hidden bg-gray-900">
                          <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            className="object-cover transition-opacity duration-300"
                            loading="lazy"
                            placeholder="blur"
                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMCwsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAcI/8QAHxAAAgEEAgMAAAAAAAAAAAAAAQIDAAQFEQYhEjFR/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAYEQEBAQEBAAAAAAAAAAAAAAABAgADEf/aAAwDAQACEQMRAD8AqeL4/wASx0vJL2eC0t4reBgryxxKqs3kBsE6J0O/tSviGJteQ5+5urGES20s7NExUHy0TokeD/alKDmJdOuf/9k="
                            style={{
                              ...(image.objectPosition && { objectPosition: image.objectPosition }),
                              ...(image.scale && { transform: `scale(${image.scale})` }),
                            }}
                          />
                          {/* Hover overlay — category + style filters */}
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3 py-3">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] tracking-[0.2em] text-[#FD9635] uppercase font-bold">
                                {image.category}
                              </span>
                              {image.styleFilters && image.styleFilters.length > 0 && (
                                <span className="text-[9px] tracking-[0.15em] text-white/70 uppercase">
                                  | {image.styleFilters.join(' · ')}
                                </span>
                              )}
                            </div>
                          </div>
                          {/* Expand icon — top right */}
                          <button
                            className="absolute top-2 right-2 text-white/70 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            onClick={(e) => { e.stopPropagation(); setLightboxImage(image); }}
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}

        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center cursor-pointer"
            onClick={() => setLightboxImage(null)}
          >
            {/* Close button */}
            <button
              className="absolute top-6 right-6 text-white/60 hover:text-white text-3xl font-light z-10 transition-colors"
              onClick={() => setLightboxImage(null)}
            >
              ✕
            </button>

            {/* Category + Credits */}
            <div className="absolute bottom-6 left-6 z-10">
              <span className="text-base tracking-[0.2em] text-[#FD9635] uppercase font-bold">
                {[lightboxImage.category, ...(lightboxImage.tags || [])].filter((v, i, a) => a.indexOf(v) === i).join(' · ')}
              </span>
              {lightboxImage.credits && (
                <div className="mt-3 flex flex-col gap-1.5">
                  {lightboxImage.credits.photographer && (
                    <span className="text-sm text-white">
                      <span className="text-[#FD9635] font-medium">PH:</span>{' '}
                      {lightboxImage.credits.photographerLink ? (
                        <a
                          href={lightboxImage.credits.photographerLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline hover:text-[#FD9635] transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {lightboxImage.credits.photographer}
                        </a>
                      ) : (
                        lightboxImage.credits.photographer
                      )}
                    </span>
                  )}
                  {lightboxImage.credits.mua && (
                    <span className="text-sm text-white">
                      <span className="text-[#FD9635] font-medium">MUA:</span>{' '}
                      {lightboxImage.credits.muaLink ? (
                        <a
                          href={lightboxImage.credits.muaLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline hover:text-[#FD9635] transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {lightboxImage.credits.mua}
                        </a>
                      ) : (
                        lightboxImage.credits.mua
                      )}
                    </span>
                  )}
                  {lightboxImage.credits.hair && (
                    <span className="text-sm text-white">
                      <span className="text-[#FD9635] font-medium">HS:</span>{' '}
                      {renderHairCredits(lightboxImage.credits.hair)}
                    </span>
                  )}
                  {lightboxImage.credits.stylist && (
                    <span className="text-sm text-white">
                      <span className="text-[#FD9635] font-medium">FS:</span>{' '}
                      {lightboxImage.credits.stylistLink ? (
                        <a
                          href={lightboxImage.credits.stylistLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline hover:text-[#FD9635] transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {lightboxImage.credits.stylist}
                        </a>
                      ) : (
                        lightboxImage.credits.stylist
                      )}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Image */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative max-w-[90vw] max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightboxImage.src}
                alt={lightboxImage.alt}
                width={0}
                height={0}
                sizes="90vw"
                className="w-auto h-auto max-w-[90vw] max-h-[90vh] object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
