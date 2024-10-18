"use client";

import React, { useState, useLayoutEffect  } from 'react';
import dynamic from 'next/dynamic';
import io from 'socket.io-client'; // Import Socket.IO client
import 'quill'; // Import styles for Quill

// Dynamically import ReactQuill
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

// Establish the Socket.IO connection
const socket = io('http://localhost:4000');

const DocumentEditor = () => {
  const [content, setContent] = useState('');
  
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      [{ color: [] }, { background: [] }],
      ['link', 'image'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['clean'],
    ],
  };

  // Handle content changes and emit updates via Socket.IO
  const handleContentChange = (newContent: string) => {
    console.log('Content Change Detected:', newContent);
    setContent(newContent);
    socket.emit('updateContent', newContent); // Emit content updates to the server
  };

  // Function to handle saving the document
  const handleSave = async () => {
    console.log('Document Saved:', content);
    try {
      const response = await fetch('http://localhost:4000/api/saveDocument', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }), // Send the content to the server
      });

      if (response.ok) {
        console.log('Document saved successfully.');
      } else {
        console.error('Failed to save document.');
      }
    } catch (error) {
      console.error('Error saving document:', error);
    }
  };

  // Listen for content updates from other clients via Socket.IO
  useLayoutEffect (() => {
    const handleLoadDocument = (initialContent: string) => {
      console.log('Loaded initial content:', initialContent);
      setContent(initialContent); // Set the initial content when loaded
    };
  
    const handleUpdateContent = (newContent: string) => {
      console.log('Received content update:', newContent);
      if (newContent !== content) {
        setContent(newContent);
      }
    };
  
    // Emit initial content request when connected
    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
      socket.emit('loadDocument'); // Request initial document content from server
    });
  
    socket.on('loadDocument', handleLoadDocument);
    socket.on('updateContent', handleUpdateContent);
  
    return () => {
      socket.off('loadDocument', handleLoadDocument);
      socket.off('updateContent', handleUpdateContent);
    };
  }, [content]);
  

  return (
    <div className="w-full bg-white p-5 rounded-2xl shadow">
      <ReactQuill
        value={content}
        onChange={handleContentChange}
        placeholder="Start writing here..."
        theme="snow"
        className="mb-4 w-full"
        modules={modules} // Pass the custom modules
        style={{ height: '500px', color: '#1E1E1E' }} // Set height and default text color
      />
      <button
        className="bg-[#69369B] text-white rounded-full px-8 py-2 mt-10"
        onClick={handleSave}
      >
        Save Document
      </button>
    </div>
  );
};

export default DocumentEditor;