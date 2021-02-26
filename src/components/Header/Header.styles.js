const styles = () => ({
  appBar: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    alignItems: "flex-end"
  },
  toolbar: {
    justifyContent: "space-between",
    width: "100%"
  },
  title: {
    transform: "translateX(-50%)",
    left: "50%",
    position: "absolute",
    fontWeight: "bold"
  },
  textCenter: {
    textAlign: "center"
  },
  link: {
    color: "blue",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline"
    }
  }
});

export default styles;
