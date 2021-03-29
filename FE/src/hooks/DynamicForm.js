import React, { useState, useRef, useEffect } from 'react';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import Fab from "@material-ui/core/Fab";
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core/styles";

import useInterval from './useFields';

const useStyles = makeStyles({
    container: {
        display: 'grid',
        gridColumnGap: '10px',
        gridRowGap: '15px',
        gridTemplateColumns: '2fr 2fr 2fr',
        margin: '30px',
    },
});

const getFieldElements = (_fields) => {
    
    return (
        _fields.map((field,i) => <TextField
            key={i}
            id={field}
            label={field}
            variant="outlined"
            color="secondary"
        />)
    )
}

const DynamicForm = ({ labels, isExtendedForm }) => {
    const [fields, setFields] = useState(labels);
    const [fieldElements, setFieldElements] = useState(getFieldElements(fields))
    const containerRef = useRef();
    const classes = useStyles();
    
    useEffect(() => {
        if(isExtendedForm){
            setFieldElements(getFieldElements(fields));
        }else{
            setFieldElements(getFieldElements(fields.slice(0,3)));
        }
    },[fields, isExtendedForm])

    useInterval(() => {
        setFields([...fields, 'New field']);
    }, 3000)

    const showHight = () => {
        return containerRef.current ? containerRef.current.offsetHeight : '';
    };

    const inputFieldHandler = () => {
        setFields([...fields, 'New field']);
    };

    return (
        <>
            <div ref={containerRef} className={classes.container}>
                {fieldElements}
                <div>{showHight()}</div>
            </div>
            <Fab color="secondary" aria-label="add" onClick={() => inputFieldHandler()}>
                <AddIcon />
            </Fab>
        </>
    );
};

DynamicForm.propTypes = {
    labels: PropTypes.array,
};

export default DynamicForm;
