import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/postEnseignant";
import { Grid, Paper, withStyles, List, ListItem, ListItemText, Typography, Divider, Button, Container, AppBar } from "@material-ui/core";
import PostEnseignantForm from "./PostEnseignantForm";
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

const PostEnseignants = ({ classes, ...props }) => {
    //const {classes, ...props} = props
    const [currentId, setCurrentId] = useState(0)

    useEffect(() => {
        props.fetchAllPostEnseignants()
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
            props.deletePostEnseignant(id, onSuccess)
    }


    return (
        
        <Grid container>
            <Container maxWidth="lg">
                
                <AppBar position="static" color="inherit">
                    <Typography
                        variant="h2"
                        align="center">
                        Gestion enseignants
                    </Typography>
                </AppBar>
            </Container>
            <Grid item xs={5}>
                <Paper className={classes.paper}>
                    <PostEnseignantForm {...{ currentId, setCurrentId }} />
                </Paper>
            </Grid>
            <Grid item xs={7}>
                <Paper className={classes.paper}>
                    <div className="col-lg-9 mt-2 mb-2">
                        <input
                            className="form-control"
                            type="search"
                            placeholder="Recherche"
                            name="searchTerm">
                        </input>
                    </div>
                    <List>
                        {
                            props.postEnseignantList.map((record, index) => {
                                return (
                                    <Fragment key={index}>
                                        <ListItem>
                                            <ListItemText>
                                                <Typography variant="h5">
                                                    Nom et prénom : {record.nom}
                                                </Typography>
                                                <div>
                                                    Date de naissance : {record.dateN}
                                                </div>
                                                <div>
                                                    Identifiant : {record.identifiant}
                                                </div>
                                                <div>
                                                    Spécialité : {record.specialite}
                                                </div>
                                                <div>
                                                    Module : {record.module}
                                                </div>
                                                <div>
                                                    Message : {record.message}
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
    postEnseignantList: state.postEnseignant.list
})

const mapActionToProps = {
    fetchAllPostEnseignants: actions.fetchAll,
    deletePostEnseignant: actions.Delete
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(PostEnseignants));