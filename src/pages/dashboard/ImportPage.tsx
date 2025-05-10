import { useState } from "react";

export default function ImportReview() {
  const [activeImport, setActiveImport] = useState("home"); // "home", "twitter", or "youtube"

  const Breadcrumbs = ({ items }: { items: { label: string; href?: string; onClick?: () => void }[] }) => (
    <div className="flex items-center gap-2 text-sm mb-4">
      {items.map((item, index) => (
        <div key={item.label} className="flex items-center">
          {index > 0 && <span className="mx-2 text-gray-400">/</span>}
          {item.href ? (
            <button
              onClick={item.onClick}
              className="text-gray-600 hover:text-gray-800"
            >
              {item.label}
            </button>
          ) : (
            <span className="text-gray-800">{item.label}</span>
          )}
        </div>
      ))}
    </div>
  );

  if (activeImport === "youtube") {
    return (
      <div className="p-6 w-full border-t border-gray-200">
        <Breadcrumbs
          items={[
            { label: "Dashboard", href: "#", onClick: () => setActiveImport("home") },
            { label: "Import", href: "#", onClick: () => setActiveImport("home") },
            { label: "Youtube" },
          ]}
        />

        <h1 className="text-4xl font-bold text-gray-800 mb-8">Import YouTube comment</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-green-50 border border-green-100 rounded-md p-4">
            <h2 className="text-sm font-medium mb-1">Auto-fill</h2>
            <p className="text-xs text-gray-500 mb-4">Paste the URL and (part of) the comment text to auto-fill.</p>
            
            <div className="space-y-4 mb-4">
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Video URL</label>
                <input
                  type="text"
                  placeholder="https://www.youtube.com/watch?v=..."
                  defaultValue="https://www.youtube.com/watch?v=QlnfNqoLJcg"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm"
                />
              </div>
              
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Comment Text</label>
                <textarea
                  placeholder="Enter part of the comment..."
                  defaultValue="I've learned so much from you, keep doing what you do"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 h-24 text-sm"
                />
              </div>
            </div>
            
            <button className="w-full bg-teal-700 text-white px-4 py-2 rounded-md hover:bg-teal-800 text-sm">
              Auto-fill
            </button>
            
            <div className="flex items-center justify-end mt-2">
              <a href="#" className="text-xs text-teal-700 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Auto-fill not working?
              </a>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-medium mb-4">Or manually enter information</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-1">Profile Picture</h3>
                <p className="text-xs text-gray-500 mb-2">Author avatar picture.</p>
                <div className="border-2 border-dashed border-gray-200 rounded-md p-8 text-center bg-gray-50">
                  <div className="flex justify-center mb-2">
                    <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-500">Drop image here</p>
                  <p className="text-xs text-gray-400">JPEG, PNG, WEBP up to 10MB</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-1">User Information</h3>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Handle</label>
                  <input
                    type="text"
                    defaultValue="@joshtriedcoding"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-1">Comment</h3>
                <textarea
                  defaultValue="I've learned so much from you, keep doing what you do"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 h-32 text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button 
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 flex items-center"
          >
            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reset
          </button>
          <button className="bg-teal-700 text-white px-6 py-2 rounded-md hover:bg-teal-800 text-sm">
            Import Comment
          </button>
        </div>
      </div>
    );
  }

  if (activeImport === "twitter") {
    return (
      <div className="p-6 w-full border-t border-gray-200">
        <Breadcrumbs
          items={[
            { label: "Dashboard", href: "#", onClick: () => setActiveImport("home") },
            { label: "Import", href: "#", onClick: () => setActiveImport("home") },
            { label: "Twitter" },
          ]}
        />

        <h1 className="text-4xl font-bold text-gray-800 mb-8">Import Tweet</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="border rounded-md p-4">
            <h2 className="text-sm font-medium mb-1">Pre-fill information</h2>
            <p className="text-xs text-gray-500 mb-2">Paste a tweet URL to pre-fill information.</p>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="https://twitter.com/user/status/123456789"
                defaultValue="https://twitter.com/user/status/123456789"
                className="flex-1 border border-gray-300 rounded-md px-4 py-2 text-sm"
              />
              <button className="bg-teal-700 text-white px-4 py-2 rounded-md text-sm hover:bg-teal-800">
                Pre-fill Tweet
              </button>
            </div>
          </div>

          <div className="border rounded-md p-4">
            <h2 className="text-sm font-medium mb-1">Profile Picture</h2>
            <p className="text-xs text-gray-500 mb-2">Author avatar picture.</p>
            <div className="border-2 border-dashed border-gray-200 rounded-md p-8 text-center bg-gray-50">
              <div className="flex justify-center mb-2">
                <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-sm text-gray-500">Drop image here</p>
              <p className="text-xs text-gray-400">JPEG, PNG, WEBP up to 10MB</p>
            </div>
          </div>

          <div className="border rounded-md p-4">
            <h2 className="text-sm font-medium mb-1">User Information</h2>
            <p className="text-xs text-gray-500 mb-2">Author name and twitter handle.</p>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Username</label>
                <div className="relative">
                  <input
                    type="text"
                    defaultValue="Josh tried coding"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm pr-10"
                  />
                  <span className="absolute right-3 top-2 text-xs bg-red-500 text-white px-1 rounded">
                    140
                  </span>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Handle</label>
                <input
                  type="text"
                  defaultValue="@joshtriedcoding"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm"
                />
              </div>
            </div>
          </div>

          <div className="border rounded-md p-4">
            <h2 className="text-sm font-medium mb-1">Tweet Content</h2>
            <textarea
              placeholder="Enter tweet content here..."
              className="w-full border border-gray-300 rounded-md px-4 py-2 h-32 text-sm mt-2"
            />
          </div>

          <div className="border rounded-md p-4">
            <h2 className="text-sm font-medium mb-1">Settings</h2>
            <div className="flex items-center gap-2 mt-2">
              <div className="relative inline-block w-10 align-middle select-none">
                <input type="checkbox" id="verification" className="sr-only" />
                <div className="block h-6 bg-gray-200 rounded-full w-10"></div>
                <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
              </div>
              <label htmlFor="verification" className="text-sm text-gray-600">Verification badge</label>
            </div>
          </div>

          <div className="border rounded-md p-4 col-span-1 lg:col-span-2">
            <h2 className="text-sm font-medium mb-1">Images</h2>
            <p className="text-xs text-gray-500 mb-2">Images to display in the tweet.</p>
            <div className="border-2 border-dashed border-gray-200 rounded-md p-8 text-center bg-gray-50">
              <div className="flex justify-center mb-2">
                <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-sm text-gray-500">Drop image(s) here</p>
              <p className="text-xs text-gray-400">JPEG, PNG, WEBP up to 10MB each</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button 
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 flex items-center"
          >
            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reset
          </button>
          <button className="bg-teal-700 text-white px-4 py-2 rounded-md hover:bg-teal-800 text-sm">
            Import Tweet
          </button>
        </div>
      </div>
    );
  }

  // Home view (shows both import options)
  return (
    <div className="p-6 w-full">
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "#" },
          { label: "Import" },
        ]}
      />

      <h1 className="text-4xl font-bold text-gray-800 mb-2">Import a review</h1>
      <p className="text-gray-600 mb-8">Bring your reviews from various social platforms into a single place.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Twitter/X Card */}
        <div 
          className="border border-gray-200 rounded-lg overflow-hidden cursor-pointer hover:border-gray-300 flex flex-col"
          onClick={() => setActiveImport("twitter")}
        >
          <div className="bg-gray-100 h-48 flex items-center justify-center">
            <svg viewBox="0 0 24 24" width="64" height="64">
              <path d="M13.3174 10.7749L19.1457 4H17.7646L12.7853 9.8261L8.78752 4H4L10.0517 13.1525L4 20.1525H5.38119L10.5837 14.1012L14.7642 20.1525H19.5517L13.3161 10.7749H13.3174ZM11.1995 13.0253L10.5481 12.0931L5.96801 5.39567H8.19743L11.8769 10.8889L12.5283 11.8211L17.2772 18.7647H15.0477L11.1995 13.0266V13.0253Z" fill="currentColor"/>
            </svg>
          </div>
          <div className="p-4 flex-grow">
            <h2 className="font-medium mb-1">Twitter</h2>
            <p className="text-gray-600 text-sm">Import a tweet</p>
          </div>
        </div>
        
        {/* YouTube Card */}
        <div 
          className="border border-gray-200 rounded-lg overflow-hidden cursor-pointer hover:border-gray-300 flex flex-col"
          onClick={() => setActiveImport("youtube")}
        >
          <div className="bg-red-100 h-48 flex items-center justify-center">
            <svg viewBox="0 0 24 24" width="64" height="64">
              <path d="M23.5 6.19a3 3 0 0 0-2.12-2.12C19.54 3.55 12 3.55 12 3.55s-7.54 0-9.38.52A3 3 0 0 0 .5 6.19C0 8.03 0 12 0 12s0 3.97.5 5.81a3 3 0 0 0 2.12 2.12c1.84.52 9.38.52 9.38.52s7.54 0 9.38-.52a3 3 0 0 0 2.12-2.12C24 15.97 24 12 24 12s0-3.97-.5-5.81z" fill="#FF0000"/>
              <path d="M9.55 15.5l6.17-3.5-6.17-3.5v7z" fill="#FFFFFF"/>
            </svg>
          </div>
          <div className="p-4 flex-grow">
            <h2 className="font-medium mb-1">YouTube</h2>
            <p className="text-gray-600 text-sm">Import a YouTube comment</p>
          </div>
        </div>
      </div>
      
      <p className="text-gray-500 text-sm flex items-center">
        More integrations coming soon 
        <span className="ml-1 bg-gray-100 px-1 py-0.5 rounded-sm text-xs">i</span>
      </p>
    </div>
  );
}