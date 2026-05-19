import * as React from 'react';
import { useFormikContext } from 'formik';
import {  Image as ImageIcon, Video as VideoIcon, Loader2, AlertCircle } from 'lucide-react';
import api from '@/APis/Axios';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

type UploadKind = 'image' | 'video';

type MediaUploadProps = {
    name: string;
    label?: string;
    accept?: string;
    uploadEndpoint?: string;
    disabled?: boolean;
    maxSizeBytes?: number;
    model?: string;
    attachmentType?: string;
};

function getUploadKind(file: File): UploadKind | null {
    if (file.type.startsWith('image/')) return 'image';
    if (file.type.startsWith('video/')) return 'video';

    const name = file.name.toLowerCase();
    if (name.match(/\.(png|jpe?g|gif|webp|bmp|svg)$/)) return 'image';
    if (name.match(/\.(mp4|webm|ogg|mov|m4v|avi|mkv)$/)) return 'video';
    return null;
}

export default function MediaUpload({
    name,
    label = 'Media',
    accept = 'image/*,video/*',
    uploadEndpoint = '/general/attachments',
    disabled = false,
    maxSizeBytes = 50 * 1024 * 1024,
    model,
    attachmentType = 'image',
}: MediaUploadProps) {
    const { values, setFieldValue } = useFormikContext<Record<string, unknown>>();
    const formValue = values[name];

    const currentMediaUrl = typeof formValue === 'string' ? formValue : '';

    const [isUploading, setIsUploading] = React.useState(false);
    const [uploadError, setUploadError] = React.useState<string | null>(null);

    const [localPreviewUrl, setLocalPreviewUrl] = React.useState<string | null>(null);
    const [localKind, setLocalKind] = React.useState<UploadKind | null>(null);

    const activeUrl = localPreviewUrl || currentMediaUrl;

    React.useEffect(() => {
        return () => {
            if (localPreviewUrl) URL.revokeObjectURL(localPreviewUrl);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const detectKindForPreview = React.useCallback((): UploadKind | null => {
        if (localKind) return localKind;

        if (!currentMediaUrl) return null;
        const lowered = currentMediaUrl.toLowerCase();
        if (lowered.match(/\.(png|jpe?g|gif|webp|bmp|svg)(\?|#|$)/)) return 'image';
        if (lowered.match(/\.(mp4|webm|ogg|mov|m4v|avi|mkv)(\?|#|$)/)) return 'video';
        return null;
    }, [currentMediaUrl, localKind]);

    const previewKind = detectKindForPreview();

    const [previewError, setPreviewError] = React.useState<string | null>(null);

    const resetPreviewError = React.useCallback(() => setPreviewError(null), []);



    const handlePickFile = React.useCallback(
        async (file: File | null) => {
            if (!file) return;

            setUploadError(null);
            setPreviewError(null);

            const kind = getUploadKind(file);
            if (!kind) {
                setUploadError('Unsupported file type. Please upload an image or a video.');
                return;
            }

            if (file.size > maxSizeBytes) {
                setUploadError(`File is too large. Max size is ${Math.round(maxSizeBytes / (1024 * 1024))}MB.`);
                return;
            }

            setIsUploading(true);

            const nextLocalUrl = URL.createObjectURL(file);
            setLocalPreviewUrl((prev) => {
                if (prev) URL.revokeObjectURL(prev);
                return nextLocalUrl;
            });
            setLocalKind(kind);

            try {
                const formData = new FormData();

                formData.append('file', file);
                formData.append('model', model);
                formData.append('attachment_type', attachmentType);

                const res = await api.post(uploadEndpoint, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });

                if (res.data) {
                    const uploadedMedia = res.data?.data || res.data;
                    setFieldValue(name, uploadedMedia);

                    // للـ preview استخدم الـ filename للـ build URL
                    if (typeof uploadedMedia === 'string') {
                        const fullUrl = `https://multi-vendors-989.saied.aait-d.com/storage/images/sliders/${uploadedMedia}`;
                        setLocalPreviewUrl((prev) => {
                            if (prev) URL.revokeObjectURL(prev);
                            return fullUrl;
                        });
                    }
                }

            } catch (e) {
                const msg = e instanceof Error ? e.message : 'Media upload failed. Please try again.';
                setUploadError(msg);

                setLocalPreviewUrl((prev) => {
                    if (prev) URL.revokeObjectURL(prev);
                    return null;
                });
                setLocalKind(null);
            } finally {
                setIsUploading(false);
            }
        },
        [maxSizeBytes, name, setFieldValue, uploadEndpoint, model, attachmentType]
    );

    const inputId = React.useId();

    return (
        <div className="flex flex-col gap-3">
            {label ? <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{label}</div> : null}

            <input
                id={inputId}
                type="file"
                accept={accept}
                className="hidden"
                disabled={disabled || isUploading}
                onChange={(e) => {
                    const file = e.currentTarget.files?.[0] ?? null;
                    e.currentTarget.value = '';
                    void handlePickFile(file);
                }}
            />

            {uploadError ? (
                <div className="flex items-start gap-2 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-red-700 dark:text-red-200">
                    <AlertCircle className="h-4 w-4 mt-0.5" />
                    <div className="text-sm">{uploadError}</div>
                </div>
            ) : null}

            <div className="mt-1">
                <div className="relative flex flex-col items-center justify-center rounded-xl border  bg-gray-100/60 dark:bg-card p-3">
                    {!activeUrl ? (
                        <div className="flex items-center justify-center py-8 text-sm text-gray-500 dark:text-gray-400">
                            No media selected.
                        </div>
                    ) : previewKind === 'video' ? (
                        <video
                            src={activeUrl}
                            controls
                            className="w-full aspect-video rounded-lg bg-black/10 object-contain"
                            onError={() => {
                                resetPreviewError();
                                setPreviewError('Unable to preview this video.');
                            }}
                        />
                    ) : previewKind === 'image' ? (
                        <img
                            src={activeUrl}
                            alt={name}
                            className=" max-w-xs aspect-video rounded-lg  object-contain"
                            onError={() => {
                                resetPreviewError();
                                setPreviewError('Unable to preview this image.');
                            }}
                        />
                    ) : (
                        <div className="flex items-center justify-center py-10 text-sm text-gray-500 dark:text-gray-400 gap-3">
                            <span className="flex items-center gap-2">
                                <ImageIcon className="h-4 w-4" />
                                Preview unavailable (unknown type)
                            </span>
                        </div>
                    )}

                    {previewError ? (
                        <div className="mt-3">
                            <div className="flex items-start gap-2 rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-3 text-yellow-900 dark:text-yellow-100">
                                <AlertCircle className="h-4 w-4 mt-0.5" />
                                <div className="text-sm">{previewError}</div>
                            </div>
                        </div>
                    ) : null}

                    <div className="mt-3 flex items-center w-full justify-between">
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                            {previewKind === 'video' ? (
                                <span className="inline-flex items-center gap-2">
                                    <VideoIcon className="h-4 w-4" /> Video
                                </span>
                            ) : previewKind === 'image' ? (
                                <span className="inline-flex items-center gap-2">
                                    <ImageIcon className="h-4 w-4" /> Image
                                </span>
                            ) : (
                                <span className="inline-flex items-center gap-2">—</span>
                            )}
                        </div>

                        <Button
                            type="button"
                            className='bg-sidebar-accent'
                            onClick={() => {
                                if (disabled || isUploading) return;
                                const el = document.getElementById(inputId) as HTMLInputElement | null;
                                el?.click();
                            }}
                            disabled={disabled || isUploading}
                        >
                            {isUploading ? (
                                <span className="inline-flex  items-center gap-2">
                                    <Loader2 className="h-4 w-4 animate-spin" /> Uploading
                                </span>
                            ) : (
                                'Replace'
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}