import React, { useEffect, useState } from "react";
import { TextField, withStyles, Button } from "@material-ui/core";
import useForm from "../useForm";
import { connect } from "react-redux";
import * as actions from "../../actions/postEnseignant";
import ButterToast, { Cinnamon } from "butter-toast";
import { AssignmentTurnedIn } from "@material-ui/icons";

const initialFieldValues = {
    nom: '',
    dateN: '',
    identifiant: '',
    specialite: '',
    module: '',
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

const PostEnseignantForm = ({ classes, ...props }) => {

    useEffect(() => {
        if (props.currentId != 0){
            setValues({
                ...props.postEnseignantList.find(x => x._id == props.currentId)
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
        temp.module = values.module ? "" : "This field is required."
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
                props.createPostEnseignant(values, onSuccess)
            else
                props.updatePostEnseignant(props.currentId, values, onSuccess)
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
                dateformat="dd/MM/yyyy"
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
                name="module"
                variant="outlined"
                label="Module"
                fullWidth
                value={values.module}
                onChange={handleInputChange}
                {...(errors.module && { error: true, helperText: errors.module })}
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
    postEnseignantList: state.postEnseignant.list
})

const mapActionToProps = {
    createPostEnseignant: actions.create,
    updatePostEnseignant: actions.update
}


export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(PostEnseignantForm));