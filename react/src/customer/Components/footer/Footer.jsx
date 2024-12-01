import { Grid, Link, Typography } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const handleAboutUsClick = () => {
    navigate('/about');
  };

  const handleTermsAndConditionsClick = () => {
    navigate('/terms-and-conditions');
  };

  return (
    <Grid
      className="bg-black text-white mt-10 text-center"
      container
      color={'white'}
      sx={{ bgcolor: 'black', color: 'white', py: 3 }}
    >
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography className="pb-5" variant="h6" gutterBottom>
              About Us
            </Typography>
            <Link
              onClick={handleAboutUsClick}
              color="inherit"
              underline="hover"
              style={{ cursor: 'pointer' }}
            >
              <Typography variant="body2" component="p" gutterBottom>
                About
              </Typography>
            </Link>
            <Link
              onClick={handleTermsAndConditionsClick}
              color="inherit"
              underline="hover"
              style={{ cursor: 'pointer' }}
            >
              <Typography variant="body2" component="p" gutterBottom>
                Terms & Conditions
              </Typography>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography className="pb-5" variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" component="p" gutterBottom>
              Phone: +92 123 456 7890
            </Typography>
            <Grid container justifyContent="center" spacing={2}>
              <Grid item>
                <Link href="#" color="inherit">
                  <InstagramIcon />
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" color="inherit">
                  <FacebookIcon />
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" color="inherit">
                  <YouTubeIcon />
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" color="inherit">
                  <WhatsAppIcon />
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid className="pt-20" item xs={12}>
        <Typography variant="body2" component="p" align="center">
          &copy; 2024 FashionFix. All rights reserved.
        </Typography>
        <Typography variant="body2" component="p" align="center">
          Made with love by Team Fashion Fix.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Footer;