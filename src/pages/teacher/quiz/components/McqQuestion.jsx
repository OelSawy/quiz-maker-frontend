// @ts-nocheck
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { useState } from 'react';

export default function McqQuestion({ onConfirm, onCancel }) {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '', '', '']); // default 4 options
    const [correctIndex, setCorrectIndex] = useState('');

    const handleOptionChange = (value, index) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleConfirm = () => {
        if (!question || options.some(opt => !opt) || correctIndex === null) {
            alert('Please fill all fields and select the correct answer.');
            return;
        }
        onConfirm({ type: 'MULTIPLE_CHOICE', question, options, answer: correctIndex });
        setQuestion('');
        setOptions(['', '', '', '']);
        setCorrectIndex(null);
    };

    return (
        <Dialog open={true} onClose={onCancel} maxWidth="sm" fullWidth>
            <DialogTitle>Add Multiple Choice Question</DialogTitle>
            <DialogContent className="flex flex-col space-y-4 mt-2">
                <TextField
                    label="Question"
                    variant="outlined"
                    fullWidth
                    value={question}
                    onChange={e => setQuestion(e.target.value)}
                    InputProps={{ sx: { fontSize: '1.2rem' } }}
                />

                <RadioGroup
                    value={correctIndex !== null ? correctIndex.toString() : ''}
                    onChange={e => setCorrectIndex(e.target.value)}
                >
                    {options.map((opt, idx) => (
                        <div key={idx} className="flex items-center space-x-2 mb-2">
                            <FormControlLabel
                                value={idx.toString()}
                                control={<Radio />}
                                label=""
                            />
                            <TextField
                                label={`Option ${idx + 1}`}
                                variant="outlined"
                                fullWidth
                                value={opt}
                                onChange={e => handleOptionChange(e.target.value, idx)}
                                InputProps={{ sx: { fontSize: '1.1rem' } }}
                            />
                        </div>
                    ))}
                </RadioGroup>
            </DialogContent>

            <DialogActions>
                <Button onClick={onCancel}>Cancel</Button>
                <Button variant="contained" color="primary" onClick={handleConfirm}>Confirm</Button>
            </DialogActions>
        </Dialog>
    );
}
