import { Title } from '@mantine/core';
// import { Welcome } from '../components/Welcome/Welcome';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';

export default function HomePage() {
  return (
    <>
      <Title order={1}>Shop in NextJs</Title>
      <ColorSchemeToggle />
    </>
  );
}
