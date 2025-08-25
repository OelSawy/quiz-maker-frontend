// @ts-nocheck
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import { useState } from 'react';

export default function TextQuestion({ onConfirm, onCancel }) {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    const handleConfirm = () => {
        if (!question || !answer) {
            alert('Please fill both question and answer.');
            return;
        }
        onConfirm({ type: 'TEXT', question, answer });
        setQuestion('');
        setAnswer('');
    };

    return (
        <Dialog open={true} onClose={onCancel} maxWidth="sm" fullWidth>
            <DialogTitle>Add Text Question</DialogTitle>
            <DialogContent className="flex flex-col space-y-4 mt-2">
                <TextField
                    label="Question"
                    variant="outlined"
                    fullWidth
                    value={question}
                    onChange={e => setQuestion(e.target.value)}
                    InputProps={{ sx: { fontSize: '1.2rem' } }}
                />
                <TextField
                    label="Answer"
                    variant="outlined"
                    fullWidth
                    value={answer}
                    onChange={e => setAnswer(e.target.value)}
                    InputProps={{ sx: { fontSize: '1.2rem' } }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel}>Cancel</Button>
                <Button variant="contained" color="primary" onClick={handleConfirm}>Confirm</Button>
            </DialogActions>
        </Dialog>
    );
}
