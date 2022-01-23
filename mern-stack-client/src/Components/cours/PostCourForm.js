import React, { useEffect, useState } from "react";
import { TextField, withStyles, Button } from "@material-ui/core";
import useForm from "../useForm";
import { connect } from "react-redux";
import * as actions from "../../actions/postCour";
import ButterToast, { Cinnamon } from "butter-toast";
import { AssignmentTurnedIn } from "@material-ui/icons";

const initialFieldValues = {
    module: '',
    cour: '',
    enseignant: '',
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

const PostCourForm = ({ classes, ...props }) => {

    useEffect(() => {
        if (props.currentId != 0){
            setValues({
                ...props.postCourList.find(x => x._id == props.currentId)
            })
            setErrors({})
        }
    }, [props.currentId])

    const validate = () => {
        let temp = { ...errors }
        temp.module = values.module ? "" : "This field is required."
        temp.cour = values.cour ? "" : "This field is required."
        temp.enseignant = values.enseignant ? "" : "This field is required."
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
                props.createPostCour(values, onSuccess)
            else
                props.updatePostCour(props.currentId, values, onSuccess)
        }
    }

    return (
        <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`}
            onSubmit={handleSubmit}>
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
                name="cour"
                variant="outlined"
                label="Nom du cours"
                fullWidth
                value={values.cour}
                onChange={handleInputChange}
                {...(errors.cour && { error: true, helperText: errors.cour })}
            />
            <TextField
                name="enseignant"
                variant="outlined"
                label="Enseignant(s)"
                fullWidth
                value={values.enseignant}
                onChange={handleInputChange}
                {...(errors.enseignant && { error: true, helperText: errors.enseignant })}
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
    postCourList: state.postCour.list
})

const mapActionToProps = {
    createPostCour: actions.create,
    updatePostCour: actions.update
}


export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(PostCourForm));