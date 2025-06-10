import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  getMetadata,
} from 'firebase/storage';
import { storage, isDemoMode } from './firebase';
import { FileUploadResult } from '@/types';

// Demo mode file upload simulation
const simulateFileUpload = async (file: File): Promise<FileUploadResult> => {
  // Simulate upload delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Create a fake URL for demo purposes
  const fakeUrl = `https://demo-storage.example.com/images/demo-${Date.now()}-${file.name}`;
  
  return {
    url: fakeUrl,
    path: `demo/images/${file.name}`,
    name: file.name,
    size: file.size,
  };
};

export const uploadFile = async (
  file: File,
  path: string,
  userId: string
): Promise<FileUploadResult> => {
  if (isDemoMode || !storage) {
    console.log('Demo mode: Simulating file upload');
    return simulateFileUpload(file);
  }

  const fileExtension = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExtension}`;
  const fullPath = `${path}/${userId}/${fileName}`;
  
  const storageRef = ref(storage, fullPath);
  
  try {
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return {
      url: downloadURL,
      path: fullPath,
      name: fileName,
      size: file.size,
    };
  } catch (error) {
    console.error('Error uploading file:', error);
    throw new Error('Failed to upload file');
  }
};

export const deleteFile = async (path: string): Promise<void> => {
  if (isDemoMode || !storage) {
    console.log('Demo mode: Simulating file deletion');
    return;
  }

  try {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
  } catch (error) {
    console.error('Error deleting file:', error);
    throw new Error('Failed to delete file');
  }
};

export const getFileMetadata = async (path: string) => {
  if (isDemoMode || !storage) {
    console.log('Demo mode: Simulating file metadata retrieval');
    return {
      name: 'demo-file.jpg',
      size: 1024000,
      contentType: 'image/jpeg',
      timeCreated: new Date().toISOString(),
    };
  }

  try {
    const storageRef = ref(storage, path);
    return await getMetadata(storageRef);
  } catch (error) {
    console.error('Error getting file metadata:', error);
    throw new Error('Failed to get file metadata');
  }
};

export const uploadImage = async (file: File, userId: string): Promise<FileUploadResult> => {
  if (!file.type.startsWith('image/')) {
    throw new Error('File must be an image');
  }
  
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    throw new Error('Image must be smaller than 5MB');
  }
  
  return uploadFile(file, 'images', userId);
};

export const uploadDocument = async (file: File, userId: string): Promise<FileUploadResult> => {
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
  ];
  
  if (!allowedTypes.includes(file.type)) {
    throw new Error('File type not supported');
  }
  
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    throw new Error('Document must be smaller than 10MB');
  }
  
  return uploadFile(file, 'documents', userId);
};