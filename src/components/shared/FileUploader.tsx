'use client'

import { useCallback } from 'react'
import { convertFileToUrl } from '@/lib/utils'
import Image from 'next/image'
import { useDropzone } from 'react-dropzone'
import { IoCloudUploadOutline } from 'react-icons/io5'

interface FileUploaderProps {
  files: File[] | undefined
  onChange: (files: File[]) => void
}

const FileUploader = ({ files, onChange }: FileUploaderProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onChange(acceptedFiles)
    },
    [onChange]
  )

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  return (
    <div {...getRootProps()} className="file-upload">
      <input {...getInputProps()} />
      {files && files?.length > 0 ? (
        <Image
          src={convertFileToUrl(files[0])}
          width={1000}
          height={1000}
          alt="uploaded image"
          className="max-h-[400px] overflow-hidden object-cover"
        />
      ) : (
        <>
          <div className="flex p-4 items-center justify-center rounded-full border-2 border-dashed bg-dark-500">
            <IoCloudUploadOutline className="h-8 w-8 text-pink-400" />
          </div>
          <div className="file-upload_label">
            <p className="text-14-regular">
              <span className="text-pink-400">Click to upload</span> or drag and
              drop
            </p>
            <p>PNG or JPG (Max 800 x 400)</p>
          </div>
        </>
      )}
    </div>
  )
}

export default FileUploader
