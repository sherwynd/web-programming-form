import { TextField, Typography, Button, FormControl, InputLabel, InputAdornment, OutlinedInput, Select, MenuItem, Stack, Box, Grid, Paper, Input, FormLabel, FormHelperText, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useState, useRef } from 'react';

const ProductForm = () => {
    const creatorId = JSON.parse(localStorage.getItem('profile')).refId;

    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [location, setLocation] = useState('');
    const [condition, setCondition] = useState('');
    const [acquisition, setAcquisition] = useState('');
    const [imgs, setImgs] = useState([]);

    const [error, setError] = useState(null);
    const isFirstRender = useRef(true);

    const [open, setOpen] = useState(false);
    const handleOpen = (e) => {
        e.preventDefault();
        if (isNaN(price) || price < 1) {
            setError('Price must be a positive number');
            setOpen(false);
        } else if (!/^\d+(\.\d{1,2})?$/.test(price)) {
            setError('The input must be a valid price (e.g., 10.99)');
            setOpen(false);
        } else {
            setError('');
            setOpen(true);
        }
    };
    const handleClose = (e) => {
        e.preventDefault();
        setOpen(false);
    };

    const handleConfirm = async (e) => {
        e.preventDefault();
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('brand', brand);
        formData.append('location', location);
        formData.append('condition', condition);
        formData.append('acquisition', acquisition);
        formData.append('creatorId', creatorId);
        imgs.forEach((file) => {
            formData.append('imgs', file);
        });

        const response = await fetch('http://localhost:3000/discover', {
            method: 'POST',
            body: formData,
        });

        const json = await response.json();
        if (!response.ok) {
            setError(json.message);
        }
        if (response.ok) {

            setTitle('');
            setPrice('');
            setDescription('');
            setCategory('');
            setBrand('');
            setLocation('');
            setCondition('');
            setAcquisition('');
            setImgs([]);
            setSelectedFiles([]);
            setError(null);
            renderPhotos(selectedFiles);
        }
        setOpen(false);
    }

    const [selectedFiles, setSelectedFiles] = useState([]);
    const handleImageChange = (e) => {
        if (e.target.files) {

            const newFiles = Array.from(e.target.files);
            setImgs((prevImgs) => [...prevImgs, ...newFiles]);

            const filesArray = Array.from(e.target.files).map((file) =>
                URL.createObjectURL(file)
            );

            setSelectedFiles((prevImages) => prevImages.concat(filesArray));
            Array.from(e.target.files).map(
                (file) => URL.revokeObjectURL(file)
            );
        }
    };
    const renderPhotos = (source) => {
        if (source.length === 0) {
            return (
                <Typography variant="h6" sx={{ m: 2 }}>No images selected</Typography>
            )
        }
        return source.map((photo, index) => {
            return (
                <Grid item lg={2} key={index}>
                    <Box component="img" src={photo} key={photo} sx={{ width: "20vh", height: "20vh", m: 1, objectFit: "contain" }} alt="" />
                </Grid>
            )
        });
    };

    const categories = ['Running', 'Shirts', 'Badminton', 'Football', 'Swimming', 'Basketball', 'Table Tennis', 'Tennis', 'Squash', 'Hockey', 'Others'];

    return (
        <>
            <Paper elevation={2} sx={{ bgcolor: "secondary.main", p: 5 }}>
                <Typography variant='h4' sx={{ m: 2 }}>Sell your Item</Typography>
                <form onSubmit={(e) => handleOpen(e)}>
                    <Stack spacing={2} sx={{ justifyContent: "center", alignItems: "center", display: "flex", mb: 5 }}>

                        <FormControl required sx={{ m: 1, width: "50%" }} >
                            <InputLabel htmlFor="title">Title</InputLabel>
                            <OutlinedInput
                                id="title"
                                label="title"
                                onChange={(e) => setTitle(e.target.value)}
                                value={title}
                            />
                        </FormControl>

                        <FormControl required sx={{ m: 1, width: "50%" }}>
                            <InputLabel htmlFor="price">Price</InputLabel>
                            <OutlinedInput
                                id="price"
                                startAdornment={<InputAdornment position="start">RM</InputAdornment>}
                                label="price"
                                onChange={(e) => setPrice(e.target.value)}
                                value={price}
                                type='text'
                                error={!!error}
                            />
                            <FormHelperText sx={{ color: 'red' }}>{error}</FormHelperText>
                        </FormControl>

                        <TextField
                            required
                            id="description"
                            label="Description"
                            multiline
                            rows={5}
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                            sx={{ m: 1, width: "50%" }}
                        />

                        <FormControl required sx={{ m: 1, width: "50%" }}>
                            <InputLabel htmlFor="location">Location</InputLabel>
                            <OutlinedInput
                                id="location"
                                label="location"
                                onChange={(e) => setLocation(e.target.value)}
                                value={location}
                            />
                        </FormControl>

                        <FormControl required sx={{ m: 1, width: "50%" }}>
                            <InputLabel htmlFor="brand">Brand</InputLabel>
                            <OutlinedInput
                                id="brand"
                                label="Brand"
                                onChange={(e) => setBrand(e.target.value)}
                                value={brand}
                            />
                        </FormControl>

                        <Grid container sx={{ width: "50%", justifyContent: "center", alignItems: "center" }}>
                            <Grid item xs={12} md={3} sx={{ m: 1 }}>
                                <FormControl required sx={{ width: "100%" }}>
                                    <InputLabel id="category">Category</InputLabel>
                                    <Select
                                        labelId="category-label"
                                        id="category"
                                        value={category}
                                        label="Category"
                                        onChange={(e) => setCategory(e.target.value)}
                                    >
                                        {categories.map((category) => (
                                            <MenuItem key={category} value={category}>
                                                {category}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} md={3} sx={{ m: 1 }}>
                                <FormControl required sx={{ width: "100%" }}>
                                    <InputLabel id="condition">Condition</InputLabel>
                                    <Select
                                        labelId="condition-label"
                                        id="condition"
                                        value={condition}
                                        label="Condition"
                                        onChange={(e) => setCondition(e.target.value)}
                                    >
                                        <MenuItem value="New">New</MenuItem>
                                        <MenuItem value="Like New">Like New</MenuItem>
                                        <MenuItem value="Very Good">Very Good</MenuItem>
                                        <MenuItem value="Good">Good</MenuItem>
                                        <MenuItem value="Acceptable">Acceptable</MenuItem>
                                        <MenuItem value="Poor">Poor</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} md={3} sx={{ m: 1 }}>
                                <FormControl required sx={{ width: "100%" }}>
                                    <InputLabel id="acquisition">Acquisition</InputLabel>
                                    <Select
                                        labelId="acquisition-label"
                                        id="acquisition"
                                        value={acquisition}
                                        label="Acquisition"
                                        onChange={(e) => setAcquisition(e.target.value)}
                                    >
                                        <MenuItem value="Meet-up Only">Meet-up Only</MenuItem>
                                        <MenuItem value="Delivery Only">Delivery Only</MenuItem>
                                        <MenuItem value="Meet-up or Delivery">Meet-up or Delivery</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>

                        <Box sx={{ width: "50%" }}>
                            <Box component={Input} type="file" id="file" multiple onChange={handleImageChange} sx={{ display: 'none' }} />
                            <Box className="label-holder">
                                <Button component={FormLabel} htmlFor="file" className="label" sx={{ width: "100%", borderRadius: 3 }} variant="outlined" >
                                    Upload Images
                                </Button>
                            </Box>
                        </Box>
                        <Grid container sx={{ display: "flex", justifyContent: "center", alignItems: "center", px: "5vh" }}>{renderPhotos(selectedFiles)}
                        </Grid>

                        <Button variant="outlined" color="primary" type="submit" sx={{ m: 1, width: "50%", borderRadius: 3 }}>Submit</Button>
                    </Stack >
                    <PopUp open={open} onClose={(e) => handleClose(e)} title="Confirmation" content="Are you sure you want to submit?" onConfirm={handleConfirm} />
                </form>
            </Paper>
        </>

    )
}


const PopUp = ({ open, onClose, title, content, onConfirm }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <Typography>{content}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">Cancel</Button>
                <Button onClick={onConfirm} color="primary">Confirm</Button>
            </DialogActions>
        </Dialog>
    );
};



export default ProductForm;