"use client"
import { CloudUpload, Delete, Remove } from "@mui/icons-material"
import { Box, Button, ButtonGroup, Stack, Typography, styled } from "@mui/material"
import { ChangeEvent, useEffect, useRef, useState } from "react"

const InvisibleInput = styled('input')({
    position: 'absolute',
    width: 0,
    height: 0,
    opacity: 0,
    overflow: 'hidden',
    zIndex: -1
})

export type ImageUploadProps = {
    folder: 'quests' | 'places'
    imageName?: string
}

export const ImageUpload = ({ imageName, folder }: ImageUploadProps) => {
    const [selectedImage, setSelectedImage] = useState<string | ArrayBuffer | null>(null);

    useEffect(() => {
        if (imageName) {
            setSelectedImage(`/uploads/${folder}/${imageName}`)
        }
    }, [folder, imageName])

    const fileInputRef = useRef<HTMLInputElement>(null)
    const checkInputRef = useRef<HTMLInputElement>(null)

    const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        checkInputRef.current?.click()
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setSelectedImage(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const clearImage = () => {
        setSelectedImage(null)
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
            checkInputRef.current?.click()
        }
    }

    return (
        <Stack spacing={2}>
            <Box
                height={300}
                width={'100%'}
                color={'text.secondary'}
                border={'2px dashed'}
                borderRadius={2}
                display={'grid'}
                sx={{
                    placeItems: 'center',
                    backgroundImage: selectedImage ? `url(${selectedImage})` : 'none',
                    backgroundPosition: 'center',
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat'
                }}
            >
                {!selectedImage && (
                    <Typography variant="h5">
                        Image preview
                    </Typography>
                )}
            </Box>
            <ButtonGroup
                sx={{ width: '100%' }}
            >
                <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUpload />}
                    sx={{ width: '50%' }}
                >
                    Upload Image
                    <InvisibleInput name="image" type="file" onChange={handleImageChange} accept="image/*" ref={fileInputRef} />
                    <InvisibleInput name="imageChanged" type="checkbox" ref={checkInputRef} />
                </Button>
                <Button
                    startIcon={<Delete />}
                    variant="contained"
                    color="secondary"
                    sx={{ width: '50%' }}
                    onClick={clearImage}
                >
                    Remove
                </Button>
            </ButtonGroup>
        </Stack >
    )
}