
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, X } from "lucide-react";

interface AvatarUploadProps {
  initialImage?: string;
  onImageChange?: (file?: File) => void;
  className?: string;
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({
  initialImage,
  onImageChange,
  className = "",
}) => {
  const [preview, setPreview] = useState<string | undefined>(initialImage);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    if (onImageChange) {
      onImageChange(file);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (onImageChange) {
      onImageChange(undefined);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <Avatar
        className="w-24 h-24 cursor-pointer transition-all duration-300 hover:opacity-90 ring-offset-background group"
        onClick={handleClick}
      >
        <AvatarImage src={preview} />
        <AvatarFallback className="bg-primary/5 flex items-center justify-center">
          <Camera className="w-8 h-8 text-primary/40" />
        </AvatarFallback>
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
          <Camera className="w-8 h-8 text-white" />
        </div>
      </Avatar>
      
      {preview && (
        <Button
          type="button"
          size="icon"
          variant="destructive"
          className="absolute -top-2 -right-2 rounded-full w-6 h-6"
          onClick={handleRemove}
        >
          <X className="w-3 h-3" />
        </Button>
      )}
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
};

export default AvatarUpload;
