import React, { useEffect, useState } from "react";
import { TextField, withStyles, Button } from "@material-ui/core";
import useForm from "../useForm";
import { connect } from "react-redux";
import * as actions from "../../actions/postMessage";
import ButterToast, { Cinnamon } from "butter-toast";
import { AssignmentTurnedIn } from "@material-ui/icons";

const initialFieldValues = {
    nom: '',
    dateN: '',
    identifiant: '',
    specialite: '',
    niveau: '',
    moy: '',
    message: '',
}

const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1)
        },
    },
    form: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    postBtn: {
        width: "50%"
    }
})

const PostMessageForm = ({ classes, ...props }) => {

    useEffect(() => {
        if (props.currentId != 0){
            setValues({
                ...props.postMessageList.find(x => x._id == props.currentId)
            })
            setErrors({})
        }
    }, [props.currentId])

    const validate = () => {
        let temp = { ...errors }
        temp.nom = values.nom ? "" : "This field is required."
        temp.message = values.message ? "" : "This field is required."
        temp.dateN = values.dateN ? "" : "This field is required."
        temp.identifiant = values.identifiant ? "" : "This field is required."
        temp.specialite = values.specialite ? "" : "This field is required."
        temp.niveau = values.niveau ? "" : "This field is required."
        temp.moy = values.moy ? "" : "This field is required."
        setErrors({
            ...temp
        })
        return Object.values(temp).every(x => x == "")
    }

    var {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues,props.setCurrentId)

    const handleSubmit = e => {
        e.preventDefault()
        const onSuccess = () => {
            ButterToast.raise({
                content: <Cinnamon.Crisp title="Post Box"
                    content="Submitted successfully"
                    scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                    icon={<AssignmentTurnedIn />}
                />
            })
            resetForm()
        }
        if (validate()) {
            if (props.currentId == 0)
                props.createPostMessage(values, onSuccess)
            else
                props.updatePostMessage(props.currentId, values, onSuccess)
        }
    }

    return (
        <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`}
            onSubmit={handleSubmit}>
            <TextField
                name="nom"
                variant="outlined"
                label="Nom et Prénom"
                fullWidth
                value={values.nom}
                onChange={handleInputChange}
                {...(errors.nom && { error: true, helperText: errors.nom })}
            />
            <TextField
                name="dateN"
                variant="outlined"
                label="Date de naissance"
                type="date"
                format="MM/dd/yyyy"
                fullWidth
                value={values.dateN}
                onChange={handleInputChange}
                InputLabelProps={{
                    shrink: true,
                  }}
                {...(errors.dateN && { error: true, helperText: errors.dateN })}
            />
            <TextField
                name="identifiant"
                variant="outlined"
                label="Identifiant"
                fullWidth
                value={values.identifiant}
                onChange={handleInputChange}
                {...(errors.identifiant && { error: true, helperText: errors.identifiant })}
            />
            <TextField
                name="specialite"
                variant="outlined"
                label="Spécialité"
                fullWidth
                value={values.specialite}
                onChange={handleInputChange}
                {...(errors.specialite && { error: true, helperText: errors.specialite })}
            />
            <TextField
                name="niveau"
                variant="outlined"
                label="Niveau"
                fullWidth
                value={values.niveau}
                onChange={handleInputChange}
                {...(errors.niveau && { error: true, helperText: errors.niveau })}
            />
            <TextField
                name="moy"
                variant="outlined"
                label="Moyenne"
                fullWidth
                value={values.moy}
                onChange={handleInputChange}
                {...(errors.niveau && { error: true, helperText: errors.moy })}
            />
            <TextField
                name="message"
                variant="outlined"
                label="Message"
                fullWidth
                multiline
                rows={4}
                value={values.message}
                onChange={handleInputChange}
                {...(errors.message && { error: true, helperText: errors.message })}
            />
            <Button
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                className={classes.postBtn}
            >Ajouter</Button>
        </form>
    );
}


const mapStateToProps = state => ({
    postMessageList: state.postMessage.list
})

const mapActionToProps = {
    createPostMessage: actions.create,
    updatePostMessage: actions.update
}


export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(PostMessageForm));