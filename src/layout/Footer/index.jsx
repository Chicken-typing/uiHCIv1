import React from "react";
import "./style.scss";
import logo from "../../assets/icons/logo-dark.png";

import {
  createStyles,
  Text,
  Container,
  ActionIcon,
  Group,
} from "@mantine/core";
import {
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandInstagram,
} from "@tabler/icons";


const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: 80,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.lg,
    backgroundColor: "black",
    borderTop: "1px solid black",
    borderRadius: "14px",
  },

  logo: {
    maxWidth: 200,

    [theme.fn.smallerThan("sm")]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  },

  description: {
    marginTop: 5,

    [theme.fn.smallerThan("sm")]: {
      marginTop: theme.spacing.xs,
      textAlign: "center",
    },
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",

    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },

  groups: {
    display: "flex",
    flexWrap: "wrap",

    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  wrapper: {
    width: 160,
  },

  link: {
    display: "block",
    fontSize: 18,
    color:
      'white',
    paddingTop: 3,
    paddingBottom: 3,
    fontWeight: 100
    
  },

  title: {
    fontSize: theme.fontSizes.lg,
    fontWeight: 700,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    marginBottom: theme.spacing.xs / 2,
    color: 'white',
  },

  afterFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: theme.spacing.xl,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,

    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
    },
  },

  social: {
    [theme.fn.smallerThan("sm")]: {
      marginTop: theme.spacing.xs,
    },
  },
}));


function Footer() {
  let groups = ''
  let links = ''
  const data = [
    {
      title: "ABOUT US",
      links: [
        {
          label: "News",
        },
        {
          label: "Carrer",
        },
        {
          label: "Inventor",
        },
        {
          label: "Sustainability",
        },
      ],
    },
    {
      title: "GET HELP",
      links: [
        {
          label: "Order status",
        },
        {
          label: "Payment options",
        },
        {
          label: "Contact Us",
        },
        {
          label: "Delivery",
        },
      ],
    },
    {
      title: "OPTION",
      links: [
        {
          label: "FIND A STORE",
        },
        {
          label: "BE COME A MEMBER",
        },
        {
          label: "SIGN UP FOR EMAIL",
        },
        {
          label: "SEND US FEEDBACK",
        },
      ],
    },
  ];
  const { classes } = useStyles();
    

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <div className={classes.logo}>
          <img className="h-[150px] w-[150px]" src={logo} alt="logo-icon" />
        </div>
       <Text className={classes.title}>
        ABOUT US
        <Text className={classes.link}>News</Text>
        <Text className={classes.link}>Carrers</Text>
        <Text className={classes.link}>Inventor</Text>
        <Text className={classes.link}>Sustainability</Text>
       </Text>
       <Text className={classes.title}>
        GET HELP
        <Text className={classes.link}>Order status</Text>
        <Text className={classes.link}>Delivery</Text>
        <Text className={classes.link}>Payment options</Text>
        <Text className={classes.link}>Contact Us</Text>
       </Text>
       <Text className={classes.title}>
        OPTIONS
        <Text className={classes.link}>Find a store</Text>
        <Text className={classes.link}>Become a Member</Text>
        <Text className={classes.link}>Sign up by Email</Text>
        <Text className={classes.link}>Send us feedback</Text>
       </Text>
      </Container>
      <Container className={classes.afterFooter}>
        <Text color="dimmed" size="sm">
          © 2022 DKL Shoes Website. All rights reserved.
        </Text>

        <Group spacing={0} className={classes.social} position="left" noWrap>
          <ActionIcon size="lg">
            <IconBrandTwitter size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg">
            <IconBrandYoutube size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg">
            <IconBrandInstagram size={18} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );
}

export default Footer;
