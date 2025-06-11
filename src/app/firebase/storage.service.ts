import { Injectable, inject } from '@angular/core';
import {
  Storage,
  uploadString,
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
  getBlob,
  listAll,
  list,
  getMetadata,
  deleteObject,
} from '@angular/fire/storage';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private storage: Storage = inject(Storage);

  constructor() {}

  // Podemos subir archivos txt, cuando subimos algo tenemos que especificar en que carpeta:forlder, el nombre del archivo:name y el contenido del archivo:text
  uploadString(folder: string, name: string, text: string) {
    const storageRef = ref(this.storage, `${folder}/${name}`);
    uploadString(storageRef, text).then((snapshot) => {
      console.log('Uploaded string! -> ', snapshot);
    });
  }

  // Lo recomendable es subir de esta forma, file permite acceder a la informacion del archivo y su contenido,
  async uploadFile(folder: string, name: string, file: File | Blob) {
    const storageRef = ref(this.storage, `${folder}/${name}`);
    const snapshot = await uploadBytes(storageRef, file);
    // devuelve una instantanea despues que el archivo se sube el archivo
    return snapshot;
  }

  // Nos permite obtener el archivo a partir de una referencia ->"carpeta/nombre_de_archivo" nos permite obtener la url de descarga, de tal forma esta url podemos mostrar al usuario para que pueda visualizar en pantalla el video,image, ect
  getDownloadURL(path: string) {
    const storageRef = ref(this.storage, path);
    return getDownloadURL(storageRef);
  }

  // Nos permite estar pendiente de los cambios para ver cual es el progreso de subida de ese archivo 5% 10% 20%
  uploadFileProgress(folder: string, name: string, file: File | Blob) {
    const storageRef = ref(this.storage, `${folder}/${name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    // uploadTask.on()
    const uploadTask$ = new Subject<ProgressUploadFile>();
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log('Upload is ' + progress + '% done');
        const event: ProgressUploadFile = {
          type: snapshot.state,
          progress,
        };
        uploadTask$.next(event);
      },
      (error) => {
        // Handle unsuccessful uploads
        const event: ProgressUploadFile = {
          type: 'error',
          error: error.message,
        };
        uploadTask$.next(event);
      },
      async () => {
        // Handle successful uploads on complete
        const url = await this.getDownloadURL(storageRef.fullPath);
        const event: ProgressUploadFile = {
          type: 'complete',
          url,
          ref: storageRef.fullPath,
        };
        uploadTask$.next(event);
      }
    );
    return uploadTask$.asObservable();
  }

  // Listamos todos los archivos que tenemos en una carpeta dentro del storage
  listAll(path: string) {
    const storageRef = ref(this.storage, path);
    return listAll(storageRef);
  }

  // Lista archivos pero a manera de paginacion
  list(path: string, maxResults: number = 100, pageToken: any = null) {
    const storageRef = ref(this.storage, path);
    const opts: any = { maxResults };
    if (pageToken) {
      opts.pageToken = pageToken;
    }
    return list(storageRef, opts);
  }

  // Pasa una variable de tipo File a una variable de tipo URL, nos sirve para visualizar el archivo dentro de la vista
  fileToUlr(file: File) {
    return URL.createObjectURL(file);
  }

  fileToBase64(file: File) {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(file);
    });
  }

  // obtenemos la metadata de un archivo -> peso, nombre, ubicacion, ect
  getMetadata(path: string) {
    const storageRef = ref(this.storage, path);
    return getMetadata(storageRef);
  }

  async urlToBlob(url: string) {
    const response = await fetch(url);
    return response.blob();
  }

  // Descarga un archivo
  // Para que el usuario pueda descargar tenemos que hacer una validacion, subir los cors al bucket 
  async downloadFile(path: string) {
    console.log('saveFile');
    const storageRef = ref(this.storage, path);
    const blob = await getBlob(storageRef);
    console.log('blob -> ', blob);

    // dos opciones

    // 1.- creando un elemento <a></a>
    const urlLocal = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = urlLocal;
    link.download = storageRef.name;
    link.click();
    link.remove();

    // usando un servio
    // this.fileSaverService.save(blob, storageRef.name);
  }

  deleteFile(path: string) {
    const storageRef = ref(this.storage, path);
    return deleteObject(storageRef);
  }
}

interface ProgressUploadFile {
  type: string;
  url?: string;
  ref?: string;
  progress?: number;
  error?: string;
}
