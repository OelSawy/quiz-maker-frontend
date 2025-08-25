// @ts-nocheck
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    TextField,
} from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useFormik } from 'formik';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createQuiz } from '../../../../redux/reducers/teacherSlice';
import * as Yup from 'yup';

const validationSchema = Yup.object({
    title: Yup.string().required('Task title is required'),
    durationInMinutes: Yup.number().required('Duration is required'),
    startTime: Yup.date().required('Due date is required'),
    year: Yup.number().required('Year is required').min(1900, 'Enter a valid year'),
});

export default function QuizDetails({ onChange }) {
    const dispatch = useDispatch();
    const [dateOpen, setDateOpen] = useState(false);

    const formik = useFormik({
        initialValues: {
            title: '',
            durationInMinutes: 0,
            startTime: '',
            year: 0,
        },
        validationSchema,
        onSubmit: values => {
            if (onChange) onChange(values);
        },
    });

    const handleChange = (field, value) => {
        formik.setFieldValue(field, value);
        if (onChange) {
            onChange({
                ...formik.values,
                [field]: field === 'startTime' && value ? new Date(value).toISOString() : value
            });
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <form onSubmit={formik.handleSubmit}>
                <div className="mx-25 mt-10 w-[74vw] h-[20vh] border-2 border-black rounded-lg p-5 flex flex-col justify-between">
                    <div className="flex items-center space-x-2">
                        <TextField
                            fullWidth
                            name="title"
                            label="Add quiz title"
                            InputProps={{ disableUnderline: true }}
                            sx={{
                                '& .MuiInputBase-root': { background: 'transparent', border: 'none' },
                                '& .MuiInputBase-input': { paddingLeft: '12px' },
                                '& .MuiInputLabel-root': { fontSize: '1.5rem', paddingLeft: '12px' },
                            }}
                            value={formik.values.title}
                            onChange={e => handleChange('title', e.target.value)}
                            error={formik.touched.title && Boolean(formik.errors.title)}
                            helperText={formik.touched.title && formik.errors.title}
                        />
                    </div>

                    <div className="flex space-x-4 mt-2 flex-row justify-between w-full rounded-3xl">
                        <TextField
                            name="durationInMinutes"
                            label="Add quiz duration (Minutes)"
                            InputProps={{ disableUnderline: true }}
                            sx={{
                                '& .MuiInputBase-root': { background: 'transparent', border: 'none' },
                                '& .MuiInputBase-input': { paddingLeft: '12px' },
                                '& .MuiInputLabel-root': { fontSize: '1.2rem', paddingLeft: '12px' },
                            }}
                            className='w-40'
                            value={formik.values.durationInMinutes}
                            onChange={e => handleChange('durationInMinutes', e.target.value)}
                            error={formik.touched.durationInMinutes && Boolean(formik.errors.durationInMinutes)}
                            helperText={formik.touched.durationInMinutes && formik.errors.durationInMinutes}
                            type="number"
                        />
                        <div className="w-40">
                            <DateTimePicker
                                label="Start Date & Time"
                                value={formik.values.startTime || null}
                                onChange={newValue => handleChange('startTime', newValue)}
                                renderInput={(params) => <TextField {...params} fullWidth />}
                                className='text-black'
                            />
                        </div>

                        <div className="w-40">
                            <TextField
                                name="year"
                                label="Enter Year"
                                type="number"
                                value={formik.values.year}
                                onChange={e => handleChange('year', e.target.value)}
                                error={formik.touched.year && Boolean(formik.errors.year)}
                                helperText={formik.touched.year && formik.errors.year}
                                InputProps={{ inputProps: { min: 1900, max: 2100 } }}
                            />
                        </div>
                    </div>
                </div>

                <Dialog open={dateOpen} onClose={() => setDateOpen(false)}>
                    <DialogTitle>Select Due Date</DialogTitle>
                    <DialogContent>
                        <TextField
                            type="datetime-local"
                            fullWidth
                            name="startTime"
                            value={formik.values.startTime}
                            onChange={formik.handleChange}
                            error={formik.touched.startTime && Boolean(formik.errors.startTime)}
                            helperText={formik.touched.startTime && formik.errors.startTime}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDateOpen(false)}>Close</Button>
                    </DialogActions>
                </Dialog>
            </form>
        </LocalizationProvider>
    );
}
