"use client"
import { CloudUpload } from "@mui/icons-material"
import { Box, Button, Stack, Typography, styled } from "@mui/material"
import { ChangeEvent, useEffect, useState } from "react"

const InvisibleInput = styled('input')({
    position: 'absolute',
    width: 0,
    height: 0,
    opacity: 0,
    overflow: 'hidden',
    zIndex: -1
})

export type ImageUploadProps = {
    imageName?: string
}

export const ImageUpload = ({ imageName }: ImageUploadProps) => {
    const [selectedImage, setSelectedImage] = useState<string | ArrayBuffer | null>(null);

    useEffect(() => {
        if (imageName) {
            setSelectedImage(`/uploads/quests/${imageName}`)
        }
    }, [imageName])

    const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setSelectedImage(reader.result)
            }
            reader.readAsDataURL(file)
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
            <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUpload />}
            >
                Upload Image
                <InvisibleInput name="image" type="file" onChange={handleImageChange} accept="image/*" />
            </Button>
        </Stack>
    )
}