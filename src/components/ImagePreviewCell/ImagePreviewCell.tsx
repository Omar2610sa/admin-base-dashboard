// ImagePreviewCell.tsx
import { useState } from 'react'
import { Dialog,  DialogContent } from '@/components/ui/dialog'

interface ImagePreviewCellProps {
    imageUrl: string
    alt?: string
}

const ImagePreviewCell = ({ imageUrl, alt = "preview" }: ImagePreviewCellProps) => {
    const [isHovered, setIsHovered] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <div
                className="relative  inline-block cursor-pointer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => setIsOpen(true)}
            >
                <img
                    src={imageUrl}
                    className="size-14  rounded-full mx-auto bg-slate-100 object-contain"
                    alt={alt}
                />

                {isHovered && (
                    <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center">
                        <span className="text-white  text-xs font-semibold">Preview</span>
                    </div>
                )}
            </div>

            <Dialog  open={isOpen} onOpenChange={setIsOpen} >
                <DialogContent className="max-w-3xl ring-0   bg-transparent shadow-none">
                    <img
                        src={imageUrl}
                        className="rounded-lg w-full  h-auto object-contain"
                        alt={alt}
                    />
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ImagePreviewCell