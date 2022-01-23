import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/postPfe";
import { Grid, Paper, withStyles, List, ListItem, ListItemText, Typography, Divider, Button, Container, AppBar } from "@material-ui/core";
import PostPfeForm from "./PostPfeForm";
import ButterToast, { Cinnamon } from "butter-toast";
import { DeleteSweep } from "@material-ui/icons";



const styles = theme => ({
    paper: {
        margin: theme.spacing(3),
        padding: theme.spacing(2)
    },
    smMargin: {
        margin: theme.spacing(1)
    },
    actionDiv: {
        textAlign: "center"
    }
})

const PostPfes = ({ classes, ...props }) => {
    //const {classes, ...props} = props
    const [currentId, setCurrentId] = useState(0)

    useEffect(() => {
        props.fetchAllPostPfes()
    }, [])//DidMount

    const onDelete = id => {
        const onSuccess = () => {
            ButterToast.raise({
                content: <Cinnamon.Crisp title="Post Box"
                    content="Deleted successfully"
                    scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                    icon={<DeleteSweep />}
                />
            })
        }
        if (window.confirm('Are you sure to delete this record?'))
            props.deletePostPfe(id, onSuccess)
    }

    return (
        <Grid container>
            <Container maxWidth="lg">
                <AppBar position="static" color="inherit">
                    <Typography
                        variant="h2"
                        align="center">
                        Gestion Pfe
                    </Typography>
                </AppBar>
            </Container>
            <Grid item xs={5}>
                <Paper className={classes.paper}>
                    <PostPfeForm {...{ currentId, setCurrentId }} />
                </Paper>
            </Grid>
            <Grid item xs={7}>
                <Paper className={classes.paper}>
                    <List>
                        {
                            props.postPfeList.map((record, index) => {
                                return (
                                    <Fragment key={index}>
                                        <ListItem>
                                            <ListItemText>
                                                <Typography variant="h5">
                                                    Titre sujet : {record.titre}
                                                </Typography>
                                                <div>
                                                    Description du sujet  :  {record.description}
                                                </div>
                                                <div>
                                                    Technologie  :  {record.tech}
                                                </div>
                                                <div>
                                                    Fiche d'affectation  :  {record.fiche}
                                                </div>
                                                <div>
                                                    Date de début du stage  :  {record.date}
                                                </div>
                                                <div className={classes.actionDiv}>
                                                    <Button variant="contained" color="primary" size="small"
                                                        className={classes.smMargin}
                                                        onClick={() => setCurrentId(record._id)}>
                                                        Modifier
                                                    </Button>
                                                    <Button variant="contained" color="secondary" size="small"
                                                        className={classes.smMargin}
                                                        onClick={() => onDelete(record._id)}>
                                                        Supprimer
                                                    </Button>
                                                </div>
                                            </ListItemText>
                                        </ListItem>
                                        <Divider component="li" />
                                    </Fragment>
                                )
                            })
                        }
                    </List>
                </Paper>
            </Grid>
        </Grid>
    );
}

const mapStateToProps = state => ({
    postPfeList: state.postPfe.list
})

const mapActionToProps = {
    fetchAllPostPfes: actions.fetchAll,
    deletePostPfe: actions.Delete
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(PostPfes));