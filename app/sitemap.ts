import type {MetadataRoute} from 'next';
import {conditions} from '../lib/conditions';

export default function sitemap():MetadataRoute.Sitemap{
  const now=new Date();
  return [
    {url:'https://www.drmugdhamohan.in/',lastModified:now,changeFrequency:'monthly',priority:1},
    ...conditions.map((condition)=>({
      url:'https://www.drmugdhamohan.in/conditions/'+condition.slug,
      lastModified:now,
      changeFrequency:'monthly' as const,
      priority:.78,
    })),
    {url:'https://www.drmugdhamohan.in/feedback',lastModified:now,changeFrequency:'yearly',priority:.35},
  ];
}
