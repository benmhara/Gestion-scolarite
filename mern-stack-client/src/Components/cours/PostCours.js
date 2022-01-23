import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/postCour";
import { Grid, Paper, withStyles, List, ListItem, ListItemText, Typography, Divider, Button, Container, AppBar } from "@material-ui/core";
import PostCourForm from "./PostCourForm";
import ButterToast, { Cinnamon } from "butter-toast";
import { DeleteSweep } from "@material-ui/icons";

function resultat(subject) {
    var val;
    if (subject <= 10){
        val = "Admis"
    }
    else{
        val = "refusé"
    }
    return val;
 }

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

const PostCours = ({ classes, ...props }) => {
    //const {classes, ...props} = props
    const [currentId, setCurrentId] = useState(0)

    useEffect(() => {
        props.fetchAllPostCours()
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
            props.deletePostCour(id, onSuccess)
    }

    return (
        <Grid container>
            <Container maxWidth="lg">
                <AppBar position="static" color="inherit">
                    <Typography
                        variant="h2"
                        align="center">
                        Gestion cours
                    </Typography>
                </AppBar>
            </Container>
            <Grid item xs={5}>
                <Paper className={classes.paper}>
                    <PostCourForm {...{ currentId, setCurrentId }} />
                </Paper>
            </Grid>
            <Grid item xs={7}>
                <Paper className={classes.paper}>
                    <List>
                        {
                            props.postCourList.map((record, index) => {
                                return (
                                    <Fragment key={index}>
                                        <ListItem>
                                            <ListItemText>
                                                <Typography variant="h5">
                                                    Module : {record.module}
                                                </Typography>
                                                <div>
                                                    Cours  :  {record.cour}
                                                </div>
                                                <div>
                                                    Enseignant  :  {record.enseignant}
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
    postCourList: state.postCour.list
})

const mapActionToProps = {
    fetchAllPostCours: actions.fetchAll,
    deletePostCour: actions.Delete
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(PostCours));