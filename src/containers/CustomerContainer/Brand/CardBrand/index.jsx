import { createStyles, Paper, Text, Title, Button } from "@mantine/core"
import Item from "../../../../components/Item"

const useStyles = createStyles(theme => ({
  card: {
          height: 440,
          width: 440,
          textAlign: 'center',
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "flex-start",
          backgroundSize: "cover",
          backgroundPosition: "center",
          '@media (max-width: 414px)': {
            width: '100%',
            height: 320
          },
          

  },

  title: {
    fontFamily: `Greycliff CF ${theme.fontFamily}`,
    fontWeight: 900,
    color: theme.white,
    lineHeight: 1.2,
    fontSize: 32,
    marginTop: theme.spacing.xs
  },

  category: {
    color: theme.white,
    opacity: 0.7,
    fontWeight: 700,
    textTransform: "uppercase"
  }
}))

export function CardBrand({data}) {


  const { classes } = useStyles()

  return (
    <div className="">
      {data.map((item, index) => (
         <Paper
         shadow="md"
         p="xl"
         radius="md"
         sx={{ backgroundImage: `url(${item.image})` }}
         className={classes.card}
       >
         <div>
           <Text className={classes.category} size="xs">
             {item.category}
           </Text>
           <Title order={3} className={classes.title}>
             {item.title}
           </Title>
         </div>
       </Paper>
      ))}
    </div>
  )
}