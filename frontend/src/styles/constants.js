// src/styles/constants.js

// Layout constants
export const LAYOUT = {
    container: "min-h-screen bg-logos-white-bluish flex",
    mainContent: "flex-1 flex flex-col h-screen",
    contentArea: "flex-1 overflow-x-auto overflow-y-hidden bg-logos-white-bluish",
    innerPadding: "p-6 min-w-full h-full",
    flexRow: "flex items-start gap-4",
  };
  
  // Header styles
  export const HEADER = {
    container: "bg-logos-white-bluish px-6 py-4 relative z-0",
    titleButton: "flex items-center gap-2 text-xl font-medium text-neutral-grey-800 hover:bg-gray-50 rounded px-2 py-1",
    chevron: "transition-transform",
  };
  
  // Column styles
  export const COLUMN = {
    container: "w-72 shrink-0",
    header: {
      container: "px-4 py-3",
      titleInput: "w-full text-base font-medium bg-transparent rounded border border-neutral-300 px-2 py-1 focus:outline-none focus:border-blue-500",
      titleDisplay: "text-base font-medium text-neutral-900",
      description: {
        container: "mt-2",
        input: "w-full rounded border border-neutral-300 px-2 py-1 text-sm resize-vertical bg-transparent focus:outline-none focus:border-blue-500",
        text: "text-sm text-neutral-600 break-words",
      },
    },
    content: "px-4 pb-4 space-y-2 min-h-[1px]",
  };
  
  // Card styles
  export const CARD = {
    container: "relative bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200",
    content: "p-4",
    form: {
      container: "space-y-3",
      input: "flex-1 min-w-0 px-3 py-2 text-base rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500",
      textarea: "w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px] resize-none",
    },
    display: {
      container: "space-y-3",
      title: "text-base font-medium text-gray-900 min-w-0 flex-1 break-words",
      description: "text-sm text-gray-600 break-words overflow-hidden",
    },
    labels: {
      container: "flex flex-wrap gap-2",
      item: "px-3 py-1 rounded-full text-sm break-words",
      button: "px-3 py-1 rounded-full text-sm text-gray-600 hover:bg-gray-50",
    },
  };
  
  // Add Column/Card button styles
  export const ADD_BUTTON = {
    container: "w-72 shrink-0",
    button: {
      default: "group flex w-full items-center justify-center gap-2 px-4 py-3",
      active: "flex w-full items-center gap-1 rounded-lg border-2 border-white bg-white p-3 text-sm text-black hover:bg-neutral-grey-50",
    },
    form: {
      container: "p-2",
      wrapper: "rounded-lg bg-white/50 p-3 backdrop-blur-sm transition-all",
      input: "w-full rounded-md border border-gray-200 bg-white/80 px-3 py-2 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500",
      buttons: {
        container: "mt-3 flex justify-end gap-2",
        cancel: "rounded-md p-1.5 text-gray-500 hover:bg-gray-100/80",
        submit: "rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1",
      },
    },
  };
  
  // Animation variants for Framer Motion
  export const ANIMATIONS = {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    slideIn: {
      initial: { x: -320 },
      animate: { x: 0 },
      exit: { x: -320 },
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  };