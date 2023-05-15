import React from 'react'
import { Title, Text, Container, Button, Overlay, createStyles } from '@mantine/core';

const useStyles = createStyles(theme => ({
    wrapper: {
      position: "relative",
      paddingTop: 180,
      paddingBottom: 130,
      backgroundImage:
        "url(https://images.unsplash.com/photo-1552346154-21d32810aba3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8c25lYWtlcnN8ZW58MHx8MHx8&w=1000&q=80)",
      backgroundSize: "cover",
      backgroundPosition: "center",
      maxWidth: '100%',
      "@media (max-width: 520px)": {
        paddingTop: 80,
        paddingBottom: 50
      }
    },
  
    inner: {
      position: "relative",
      zIndex: 1
    },
  
    title: {
      fontWeight: 800,
      fontSize: 40,
      letterSpacing: -1,
      paddingLeft: theme.spacing.md,
      paddingRight: theme.spacing.md,
      color: theme.white,
      marginBottom: theme.spacing.xs,
      textAlign: "center",
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  
      "@media (max-width: 520px)": {
        fontSize: 28,
        textAlign: "left"
      }
    },
  
    highlight: {
      color: theme.colors[theme.primaryColor][4]
    },
  
    description: {
      color: theme.colors.gray[0],
      textAlign: "center",
  
      "@media (max-width: 520px)": {
        fontSize: theme.fontSizes.md,
        textAlign: "left"
      }
    },
  
    controls: {
      marginTop: theme.spacing.xl * 1.5,
      display: "flex",
      justifyContent: "center",
      paddingLeft: theme.spacing.md,
      paddingRight: theme.spacing.md,
  
      "@media (max-width: 520px)": {
        flexDirection: "column"
      }
    },
  
    control: {
      height: 42,
      fontSize: theme.fontSizes.md,
  
      "&:not(:first-of-type)": {
        marginLeft: theme.spacing.md
      },
  
      "@media (max-width: 520px)": {
        "&:not(:first-of-type)": {
          marginTop: theme.spacing.md,
          marginLeft: 0
        }
      }
    },
  
    secondaryControl: {
      color: theme.white,
      backgroundColor: "rgba(255, 255, 255, 0.4)",
  
      "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.45) !important"
      }
    }
  }))

function MainBackground() {
    const { classes, cx } = useStyles();
    
  return (
    <div className={classes.wrapper}>
      <Overlay color="#000" opacity={0.65} zIndex={1} />

      <div className={classes.inner}>
        <Title className={classes.title}>
          CELEBRATING 40 YEARS OF FORCE{' '}
          <Text component="span" inherit className={classes.highlight}>
            for Join Forces Pack 
          </Text>
        </Title>

        <Container size={640}>
          <Text size="lg" className={classes.description}>
            Icons weren't made in a day. The Join Forces Pack honours 40 years of
              Force and the communities that embraced the AF1 
          </Text>
        </Container>

        <div className={classes.controls}>
          <Button className={cx(classes.control, classes.secondaryControl)} variant="white" size="lg">
                <a href="#popular"> Get started</a>
          </Button>
          <Button className={cx(classes.control, classes.secondaryControl)} size="lg">
                <a href="#news">More Details</a>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default MainBackground