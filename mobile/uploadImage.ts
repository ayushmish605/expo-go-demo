export async function uploadImage(imageUri: string, serverBaseUrl: string) {
  const form = new FormData();

  form.append(
    'photo',
    {
      uri: imageUri,
      name: `photo-${Date.now()}.jpg`,
      type: 'image/jpeg',
    } as any
  );

  const res = await fetch(`${serverBaseUrl}/upload`, {
    method: 'POST',
    body: form,
    headers: {
      Accept: 'application/json',
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Upload failed (${res.status}): ${text}`);
  }

  return (await res.json()) as { imageUrl: string };
}
