import { Button, Typography } from '@packages/components';
import Icon from '@packages/components/Icon';
import Image from 'next/image';
import chroma from 'chroma-js';

export default function Home() {
  // hover: alpha(grey[500], 0.08),
  // selected: alpha(grey[500], 0.16),
  // disabled: alpha(grey[500], 0.8),
  // disabledBackground: alpha(grey[500], 0.24),
  // focus: alpha(grey[500], 0.24),

  const test = {
    hover: chroma('#919EAB').alpha(0.08).hex(),
    selected: chroma('#919EAB').alpha(0.16).hex(),
    disabled: chroma('#919EAB').alpha(0.8).hex(),
    disabledBackground: chroma('#919EAB').alpha(0.24).hex(),
    focus: chroma('#919EAB').alpha(0.24).hex(),
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen w-screen gap-2">
      {/* <div className="flex gap-2">
        <Button variant="contained" color="primary">
          primary
        </Button>

        <Button variant="contained" color="secondary">
          secondary
        </Button>

        <Button variant="contained" color="info">
          info
        </Button>

        <Button variant="contained" color="warning">
          warning
        </Button>

        <Button variant="contained" color="error">
          error
        </Button>

        <Button variant="contained" color="success">
          success
        </Button>
      </div>

      <div className="flex gap-2">
        <Button variant="outlined" color="primary">
          primary
        </Button>

        <Button variant="outlined" color="secondary">
          secondary
        </Button>

        <Button variant="outlined" color="info">
          info
        </Button>

        <Button variant="outlined" color="warning">
          warning
        </Button>

        <Button variant="outlined" color="error">
          error
        </Button>

        <Button variant="outlined" color="success">
          success
        </Button>
      </div>

      <div className="flex gap-2">
        <Button variant="text" color="primary">
          primary
        </Button>

        <Button variant="text" color="secondary">
          secondary
        </Button>

        <Button variant="text" color="info">
          info
        </Button>

        <Button variant="text" color="warning">
          warning
        </Button>

        <Button variant="text" color="error">
          error
        </Button>

        <Button variant="text" color="success">
          success
        </Button>
      </div>

      <div className="flex gap-2 justify-center items-center">
        <Button
          startIcon={<Icon icon="mdi:trash-can-outline" />}
          endIcon={<Icon icon="mdi:trash-can-outline" />}
          variant="contained"
          color="primary"
          size="small"
        >
          small
        </Button>

        <Button
          startIcon={<Icon icon="mdi:trash-can-outline" />}
          endIcon={<Icon icon="mdi:trash-can-outline" />}
          variant="contained"
          color="primary"
          size="medium"
        >
          medium
        </Button>

        <Button
          startIcon={<Icon icon="mdi:trash-can-outline" />}
          endIcon={<Icon icon="mdi:trash-can-outline" />}
          variant="text"
          color="primary"
          size="large"
        >
          large
        </Button>
      </div> */}
      <div className="w-full">
        <Typography variant="h1">123123</Typography>
        <Typography variant="h2">123123</Typography>
        <Typography variant="h3">123123</Typography>
        <Typography variant="h4">123123</Typography>
        <Typography variant="h5">123123</Typography>
        <Typography variant="h6">123123</Typography>
        <Typography variant="body1">123123</Typography>
        <Typography variant="body2">123123</Typography>
      </div>
    </main>
  );
}
