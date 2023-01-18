'use client';

import Section from './Section';
import CategoryCard from './CategoryCard';
import Link from 'next/link';

type Props = {
  data?: SpotifyApi.MultipleCategoriesResponse;
};

export default function CategoryList({ data }: Props) {
  return (
    <Section>
      <Section.Header>
        <Section.Text>Gênero/Moods</Section.Text>
        <Section.Text variant="link">Mostrar tudo</Section.Text>
      </Section.Header>
      <Section.Content className="grid-rows-[1fr]">
        {data?.categories.items.map((category) => {
          return (
            <Link href={`/genre/${category.id}`} key={category.id}>
              <CategoryCard category={category} />
            </Link>
          );
        })}
      </Section.Content>
    </Section>
  );
}
