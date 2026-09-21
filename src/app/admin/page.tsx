"use client";

import { useCallback, useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { Sarpanch } from "@prisma/client";
import Link from "next/link";
import { Plus, Pencil, Trash2, Check, X, UploadCloud, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { CldUploadWidget } from "next-cloudinary";
import type { CloudinaryUploadWidgetInfo, CloudinaryUploadWidgetResults } from "next-cloudinary";

type ProfileFormProps = {
  formData: Partial<Sarpanch>;
  setFormData: Dispatch<SetStateAction<Partial<Sarpanch>>>;
  onSave: () => void;
  onCancel: () => void;
};

export default function AdminPage() {
  const [sarpanchs, setSarpanchs] = useState<Sarpanch[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<Sarpanch>>({});
  const [isCreating, setIsCreating] = useState(false);
  const router = useRouter();

  const fetchSarpanchs = useCallback(async () => {
    const res = await fetch("/api/sarpanch");

    if (!res.ok) {
      setSarpanchs([]);
      setLoading(false);
      return;
    }

    const data = await res.json();
    setSarpanchs(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      fetchSarpanchs();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [fetchSarpanchs]);

  const handleEdit = (s: Sarpanch) => {
    setEditingId(s.id);
    setFormData(s);
    setIsCreating(false);
  };

  const handleCreateNew = () => {
    setIsCreating(true);
    setEditingId(null);
    setFormData({
      slug: "",
      name: "",
      village: "",
      phone: "",
      description: "",
      image: "/placeholder-portrait.jpg",
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsCreating(false);
    setFormData({});
  };

  const handleSave = async () => {
    if (isCreating) {
      await fetch("/api/sarpanch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } else {
      const originalSlug = sarpanchs.find((s) => s.id === editingId)?.slug || formData.slug;
      await fetch(`/api/sarpanch/${originalSlug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    }
    handleCancel();
    fetchSarpanchs();
  };

  const handleDelete = async (slug: string) => {
    if (confirm("Are you sure you want to delete this profile?")) {
      await fetch(`/api/sarpanch/${slug}`, { method: "DELETE" });
      fetchSarpanchs();
    }
  };

  if (loading) return <div className="p-10 text-center">Loading Admin Panel...</div>;

  return (
    <div className="min-h-screen bg-cream p-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-navy">Admin Dashboard</h1>
            <p className="mt-1 text-ink/70">Manage dynamic websites and Sarpanch profiles</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleCreateNew}
              className="flex items-center gap-2 rounded bg-saffron px-4 py-2 text-sm font-semibold text-white hover:bg-saffron-dark"
            >
              <Plus className="h-4 w-4" /> Add New Profile
            </button>
            <button
              onClick={async () => {
                await fetch("/api/auth", { method: "DELETE" });
                router.push("/admin/login");
                router.refresh();
              }}
              className="flex items-center gap-2 rounded border border-navy/20 bg-white px-4 py-2 text-sm font-semibold text-navy hover:bg-cream"
            >
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </div>
        </div>

        <div className="grid gap-6">
          {isCreating && (
            <div className="rounded-lg bg-white p-6 shadow ring-1 ring-navy/5">
              <h2 className="mb-4 text-xl font-semibold text-navy">Create New Profile</h2>
              <ProfileForm formData={formData} setFormData={setFormData} onSave={handleSave} onCancel={handleCancel} />
            </div>
          )}

          {sarpanchs.map((s) => (
            <div key={s.id} className="rounded-lg bg-white p-6 shadow ring-1 ring-navy/5">
              {editingId === s.id ? (
                <ProfileForm formData={formData} setFormData={setFormData} onSave={handleSave} onCancel={handleCancel} />
              ) : (
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-bold text-navy">{s.name}</h3>
                      <span className="rounded-full bg-cream px-2.5 py-0.5 text-xs font-semibold text-navy">
                        {s.slug}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-ink/70">
                      {s.village || "No village"} • {s.phone || "No phone"}
                    </p>
                    <Link
                      href={`/${s.slug}`}
                      target="_blank"
                      className="mt-3 inline-block text-sm font-medium text-saffron-dark hover:underline"
                    >
                      View Live Website ↗
                    </Link>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(s)}
                      className="flex h-9 w-9 items-center justify-center rounded border border-navy/10 text-navy hover:bg-cream"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(s.slug)}
                      className="flex h-9 w-9 items-center justify-center rounded border border-red-500/10 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
          {sarpanchs.length === 0 && !isCreating && (
            <div className="rounded-lg bg-white p-10 text-center text-ink/50 shadow">
              No profiles found. Create one to get started!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ProfileForm({ formData, setFormData, onSave, onCancel }: ProfileFormProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div>
        <label className="mb-1 block text-sm font-medium text-navy">URL Slug (e.g. dheeraj)</label>
        <input
          type="text"
          value={formData.slug || ""}
          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          className="w-full rounded border border-navy/20 p-2 text-sm focus:border-saffron focus:outline-none"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-navy">Name</label>
        <input
          type="text"
          value={formData.name || ""}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full rounded border border-navy/20 p-2 text-sm focus:border-saffron focus:outline-none"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-navy">Village</label>
        <input
          type="text"
          value={formData.village || ""}
          onChange={(e) => setFormData({ ...formData, village: e.target.value })}
          className="w-full rounded border border-navy/20 p-2 text-sm focus:border-saffron focus:outline-none"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-navy">Phone Number</label>
        <input
          type="text"
          value={formData.phone || ""}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full rounded border border-navy/20 p-2 text-sm focus:border-saffron focus:outline-none"
        />
      </div>
      <div className="sm:col-span-2">
        <label className="mb-1 block text-sm font-medium text-navy">Description</label>
        <textarea
          value={formData.description || ""}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full rounded border border-navy/20 p-2 text-sm focus:border-saffron focus:outline-none"
          rows={3}
        />
      </div>
      <div className="sm:col-span-2">
        <label className="mb-2 block text-sm font-medium text-navy">Profile Image</label>
        <div className="flex items-center gap-4">
          {formData.image && (
            <img src={formData.image} alt="Preview" className="h-16 w-16 rounded object-cover ring-1 ring-navy/10" />
          )}
          <CldUploadWidget
            uploadPreset="ml_default" // default upload preset, user can configure this in Cloudinary
            onSuccess={(result: CloudinaryUploadWidgetResults) => {
              const info = result.info as CloudinaryUploadWidgetInfo | undefined;

              if (info?.secure_url) {
                setFormData({ ...formData, image: info.secure_url });
              }
            }}
          >
            {({ open }) => (
              <button
                type="button"
                onClick={() => open()}
                className="flex items-center gap-2 rounded border border-navy/20 bg-cream px-4 py-2 text-sm font-semibold text-navy transition-colors hover:bg-navy/5"
              >
                <UploadCloud className="h-4 w-4" /> Upload Image
              </button>
            )}
          </CldUploadWidget>
        </div>
      </div>
      <div className="mt-4 flex gap-3 sm:col-span-2">
        <button
          onClick={onSave}
          className="flex items-center gap-2 rounded bg-navy px-4 py-2 text-sm font-semibold text-white hover:bg-navy-light"
        >
          <Check className="h-4 w-4" /> Save Changes
        </button>
        <button
          onClick={onCancel}
          className="flex items-center gap-2 rounded border border-navy/20 bg-white px-4 py-2 text-sm font-semibold text-navy hover:bg-cream"
        >
          <X className="h-4 w-4" /> Cancel
        </button>
      </div>
    </div>
  );
}
