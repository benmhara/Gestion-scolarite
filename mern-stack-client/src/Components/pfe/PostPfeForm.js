import React, { useEffect, useState } from "react";
import { TextField, withStyles, Button } from "@material-ui/core";
import useForm from "../useForm";
import { connect } from "react-redux";
import * as actions from "../../actions/postPfe";
import ButterToast, { Cinnamon } from "butter-toast";
import { AssignmentTurnedIn } from "@material-ui/icons";

const initialFieldValues = {
    titre: '',
    description: '',
    tech: '',
    fiche: '',
    date: '',
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

const PostPfeForm = ({ classes, ...props }) => {

    useEffect(() => {
        if (props.currentId != 0){
            setValues({
                ...props.postPfeList.find(x => x._id == props.currentId)
            })
            setErrors({})
        }
    }, [props.currentId])

    const validate = () => {
        let temp = { ...errors }
        temp.titre = values.titre ? "" : "This field is required."
        temp.description = values.description ? "" : "This field is required."
        temp.tech = values.tech ? "" : "This field is required."
        temp.fiche = values.fiche ? "" : "This field is required."
        temp.date = values.date ? "" : "This field is required."
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
                props.createPostPfe(values, onSuccess)
            else
                props.updatePostPfe(props.currentId, values, onSuccess)
        }
    }

    return (
        <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`}
            onSubmit={handleSubmit}>
            <TextField
                name="titre"
                variant="outlined"
                label="Titre sujet"
                fullWidth
                value={values.titre}
                onChange={handleInputChange}
                {...(errors.titre && { error: true, helperText: errors.titre })}
            />
            <TextField
                name="description"
                variant="outlined"
                label="Description du sujet"
                fullWidth
                value={values.description}
                onChange={handleInputChange}
                {...(errors.description && { error: true, helperText: errors.description })}
            />
            <TextField
                name="tech"
                variant="outlined"
                label="Technologie"
                fullWidth
                value={values.tech}
                onChange={handleInputChange}
                {...(errors.tech && { error: true, helperText: errors.tech })}
            />
            <TextField
                name="fiche"
                variant="outlined"
                label="Fiche d'affectation"
                type="file"
                fullWidth
                value={values.fiche}
                onChange={handleInputChange}
                InputLabelProps={{
                    shrink: true,
                  }}
                {...(errors.fiche && { error: true, helperText: errors.fiche })}
            />
            <TextField
                name="date"
                variant="outlined"
                label="Date de début du stage"
                type="date"
                format="MM/dd/yyyy"
                fullWidth
                value={values.date}
                onChange={handleInputChange}
                InputLabelProps={{
                    shrink: true,
                  }}
                {...(errors.date && { error: true, helperText: errors.date })}
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
    postPfeList: state.postPfe.list
})

const mapActionToProps = {
    createPostPfe: actions.create,
    updatePostPfe: actions.update
}


export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(PostPfeForm));