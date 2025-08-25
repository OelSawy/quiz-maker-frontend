import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
    Button,
    Divider,
    FormControl,
    TextField,
    Typography,
    RadioGroup,
    FormControlLabel,
    Radio,
} from "@mui/material";
import { apiRoutes } from "../../../utils/apiRoutes";
import api from "../../../utils/api";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

const SignUpSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required."),
    lastName: Yup.string().required("Last Name is required."),
    email: Yup.string().email("Invalid email address").required("Email is required."),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required."),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required."),
    role: Yup.string().oneOf(["STUDENT", "TEACHER"]).required("Role is required."),
    year: Yup.number()
        .when("role", {
            is: "STUDENT",
            then: (schema) =>
                schema
                    .typeError("Year must be a number")
                    .required("Year is required")
                    .integer("Year must be an integer")
                    .min(1, "Year must be at least 1")
                    .max(12, "Year must be at most 12"),
            otherwise: (schema) => schema.notRequired(),
        }),
});

async function register(values) {
    delete values.confirmPassword;

    const res = await api.post(apiRoutes.register, values);

    if (res.status !== 201) {
        throw new Error("Failed to register");
    }

    return res;
}

export default function Register() {
    const router = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    return isLoading ? (
        <div />
    ) : (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-emerald-600 to-cyan-600">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 space-y-6">
                <div className="flex flex-col gap-2">
                    <Typography
                        component="h1"
                        variant="h3"
                        sx={{ marginBottom: 4 }}
                        className="text-black text-center"
                    >
                        Sign up
                    </Typography>
                </div>

                <Formik
                    initialValues={{
                        firstName: "",
                        lastName: "",
                        email: "",
                        password: "",
                        confirmPassword: "",
                        role: "STUDENT",
                        year: "",
                    }}
                    validationSchema={SignUpSchema}
                    onSubmit={async (values, { setSubmitting }) => {
                        try {
                            setIsLoading(true);
                            await register(values);
                            router("/login");
                        } catch (err) {
                            console.error(err);
                        }
                        setSubmitting(false);
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        isSubmitting,
                        handleChange,
                        setFieldValue,
                    }) => (
                        <Form className="space-y-4 w-full">
                            <FormControl fullWidth className="!mb-8">
                                <TextField
                                    name="firstName"
                                    id="firstName"
                                    placeholder="First Name"
                                    value={values.firstName}
                                    onChange={handleChange}
                                    error={touched.firstName && Boolean(errors.firstName)}
                                    helperText={touched.firstName && errors.firstName}
                                />
                            </FormControl>

                            <FormControl fullWidth className="!mb-8">
                                <TextField
                                    name="lastName"
                                    id="lastName"
                                    placeholder="Last Name"
                                    value={values.lastName}
                                    onChange={handleChange}
                                    error={touched.lastName && Boolean(errors.lastName)}
                                    helperText={touched.lastName && errors.lastName}
                                />
                            </FormControl>

                            <FormControl fullWidth className="!mb-8">
                                <TextField
                                    name="email"
                                    id="email"
                                    placeholder="Email"
                                    value={values.email}
                                    onChange={handleChange}
                                    error={touched.email && Boolean(errors.email)}
                                    helperText={touched.email && errors.email}
                                />
                            </FormControl>

                            <FormControl fullWidth className="!mb-8">
                                <TextField
                                    name="password"
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                    value={values.password}
                                    onChange={handleChange}
                                    error={touched.password && Boolean(errors.password)}
                                    helperText={touched.password && errors.password}
                                />
                            </FormControl>

                            <FormControl fullWidth className="!mb-8">
                                <TextField
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={values.confirmPassword}
                                    onChange={handleChange}
                                    error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                                    helperText={touched.confirmPassword && errors.confirmPassword}
                                />
                            </FormControl>

                            <FormControl component="fieldset" className="!mb-8">
                                <Typography variant="subtitle1" className="mb-2 text-black">
                                    Role
                                </Typography>
                                <RadioGroup
                                    row
                                    name="role"
                                    value={values.role}
                                    onChange={handleChange}
                                    className="text-black"
                                >
                                    <FormControlLabel
                                        value="STUDENT"
                                        control={<Radio />}
                                        label="Student"
                                    />
                                    <FormControlLabel
                                        value="TEACHER"
                                        control={<Radio />}
                                        label="Teacher"
                                    />
                                </RadioGroup>
                                {touched.role && errors.role && (
                                    <Typography color="error">{errors.role}</Typography>
                                )}
                            </FormControl>

                            {values.role === "STUDENT" && (
                                <FormControl fullWidth className="!mb-8">
                                    <TextField
                                        name="year"
                                        id="year"
                                        type="number"
                                        placeholder="Year"
                                        value={values.year}
                                        onChange={handleChange}
                                        error={touched.year && Boolean(errors.year)}
                                        helperText={touched.year && errors.year}
                                    />
                                </FormControl>
                            )}

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                disabled={isSubmitting}
                                className="!text-white !text-2xl bg-gradient-to-r from-emerald-600 to-cyan-600"
                            >
                                Sign up
                            </Button>
                        </Form>
                    )}
                </Formik>

                <Divider>
                    <Typography className="text-gray-500">or</Typography>
                </Divider>

                <Typography
                    className="text-center text-gray-600 dark:text-gray-400"
                    sx={{ marginTop: 2 }}
                >
                    Already have an account?{" "}
                    <Link to={"/login"} className="text-blue-600 underline">
                        Sign in
                    </Link>
                </Typography>
            </div>
        </div>
    );
}
