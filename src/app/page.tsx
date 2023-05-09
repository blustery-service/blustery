import { Button, Typography } from '@packages/components';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen w-screen gap-2">
      <div className="w-full">
        <Typography variant="h1" color="text.secondary">
          Heading
        </Typography>
        <Typography variant="h2">Heading</Typography>
        <Typography variant="h3">Heading</Typography>
        <Typography variant="h4">Heading</Typography>
        <Typography variant="h5">Heading</Typography>
        <Typography variant="h6">Heading</Typography>
        <Typography variant="body1">Heading</Typography>
        <Typography variant="body2">Heading</Typography>

        <div className="flex flex-col">
          <Typography variant="subtitle1">Heading</Typography>
          <Typography variant="subtitle2">Heading</Typography>

          <Typography variant="caption">Heading</Typography>
        </div>
        <Typography variant="body2">Heading</Typography>
      </div>
    </main>
  );
}
