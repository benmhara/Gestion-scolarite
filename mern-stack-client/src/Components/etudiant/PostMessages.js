import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/postMessage";
import { Grid, Paper, withStyles, List, ListItem, ListItemText, Typography, Divider, Button, Container, AppBar } from "@material-ui/core";
import PostMessageForm from "./PostMessageForm";
import ButterToast, { Cinnamon } from "butter-toast";
import { DeleteSweep } from "@material-ui/icons";
import axios from "axios";
import { render } from "@testing-library/react";
import SearchForm from "../searchForm";



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

const PostMessages = ({ classes, ...props }) => {
    //const {classes, ...props} = props
    const [currentId, setCurrentId] = useState(0)

    useEffect(() => {
        props.fetchAllPostMessages()
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
            props.deletePostMessage(id, onSuccess)
    };

    {/*filterContent(posts, searchTerm) {
        const result = posts.filter((post) => post.title.toLowerCase().includes(searchTerm));
        this.setState({ posts: result });
    }

    handleTextSearch = (e) => {
        const searchTerm = e.currentTarger.value;
        axios.get("/posts").then((res) => {
            if (res.data.success) {
                this.filterContent(res.data.posts, searchTerm);
            }
        })
    }*/}

    return (
        <Grid container>
            <Container maxWidth="lg">
                <AppBar position="static" color="inherit">
                    <Typography
                        variant="h2"
                        align="center">
                        Gestion étudiants
                    </Typography>
                </AppBar>
            </Container>
            <Grid item xs={5}>
                <Paper className={classes.paper}>
                    <PostMessageForm {...{ currentId, setCurrentId }} />
                </Paper>
            </Grid>
            <Grid item xs={7}>
                <Paper className={classes.paper}>
                    <div className="col-lg-9 mt-2 mb-2">
                    <SearchForm searchTodo={props.fetchAllPostMessages()} />
                    </div>
                    <List>
                        {
                            props.postMessageList.map((record, index) => {
                                return (
                                    <Fragment key={index}>
                                        <ListItem>
                                            <ListItemText>
                                                <Typography variant="h5">
                                                    Nom et prénom : {record.nom}
                                                </Typography>
                                                <div>
                                                    Date de naissance  :  {record.dateN}
                                                </div>
                                                <div>
                                                    Identifiant  :  {record.identifiant}
                                                </div>
                                                <div>
                                                    Specialité  :  {record.specialite}
                                                </div>
                                                <div>
                                                    Niveau  :  {record.niveau}
                                                </div>
                                                <div>
                                                    Moyenne : {record.moy}
                                                </div>
                                                <div>
                                                    Résultat :  {record.moy < 10 ? "'REFUSEE'" : "'ADMIS'"}
                                                </div>
                                                <div>
                                                    Message  :  {record.message}
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
    postMessageList: state.postMessage.list
})

const mapActionToProps = {
    fetchAllPostMessages: actions.fetchAll,
    deletePostMessage: actions.Delete
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(PostMessages));