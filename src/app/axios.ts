import { TrendingUpOutlined } from "@material-ui/icons";
import { CreateUserType, AuthLoginType } from "./types";

const axios = require("axios");

const instance = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});

export async function registerUser(user: CreateUserType) {
  try {
    const response = await instance.post("/profile", user);
    console.log(response);
    return true;
  } catch (error: any) {
    throw error;
  }
}

export async function login(user: AuthLoginType) {
  try {
    const response = await instance.post("/auth/login", user);
    return {
      acess: true,
      data: response.data,
    };
  } catch (error: any) {
    throw error;
  }
}

export async function loginRefresh(refreshToken: string | null) {
  try {
    const reponse = await instance.get("/auth/refresh", {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });
    localStorage.setItem("token", reponse.data);
    return true;
  } catch (error: any) {
    throw error;
  }
}

export async function getUser(token: string | null) {
  try {
    const response = await instance.get("/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Erro ao buscar dados do usuário:", error);
  }
}

export async function putUser(token: string | null, user: AuthLoginType) {
  try {
    const response = await instance.put("/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      user,
    });
    return true;
  } catch (error: any) {
    console.error("Erro ao atualizar dados do usuário:", error);
  }
}

export async function getBooks() {
  try {
    const response = await instance.get("/books/all");
    return response.data;
  } catch (error: any) {
    throw error;
  }
}
export async function getBooksForID(token: string | null, bookId: string) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await instance.get(`/books/${bookId}`, config);
    return response.data;
  } catch (error: any) {
    throw error;
  }
}

export async function putBooks(
  token: string | null,
  bookId: string,
  book: any
) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await instance.put(`/books/${bookId}`, book, config);
    return true;
  } catch (error: any) {
    throw error;
  }
}

export async function postBooks(token: string | null, book: any) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await instance.post(`/books`, book, config);
    return true;
  } catch (error: any) {
    throw error;
  }
}

export async function deleteBooks(token: string | null, bookId: string) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await instance.delete(`/books/${bookId}`, config);
    return true;
  } catch (error: any) {
    throw error;
  }
}

export async function getWishlist(token: string | null) {
  try {
    const response = await instance.get("/wishlist", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw error;
  }
}

export async function postWishlist(token: string | null, bookId: string) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const body = {
      bookId,
    };
    const response = await instance.post("/wishlist", body, config);
    return true;
  } catch (error: any) {
    throw error;
  }
}

export async function deleteWishlist(token: string | null, bookId: string) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await instance.delete(`/wishlist/${bookId}`, config);
    return true;
  } catch (error: any) {
    throw error;
  }
}

export async function getLoans(token: string | null) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await instance.get("/loan-requests/all", config);
    return response.data;
  } catch (error: any) {
    throw error;
  }
}

export async function postLoans(
  token: string | null,
  bookId: string,
  userId: string
) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const body = {
      bookId,
      userId,
    };
    await instance.post("/loan-requests", body, config);
    return true;
  } catch (error: any) {
    throw error;
  }
}

export async function putLoans(
  token: string | null,
  status: { status: string },
  loansID: string
) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await instance.put(`/loan-requests/${loansID}`, status, config);
    return true;
  } catch (error: any) {
    throw error;
  }
}

export async function loginWithGoogle() {
  try {
    window.location.href = "http://localhost:8080/auth/google"
  } catch (error) {}
}
