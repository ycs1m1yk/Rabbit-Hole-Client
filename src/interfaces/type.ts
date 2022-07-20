// 주로 atom에서 사용
export type ModalTypes = null | 'Login' | 'ProjectRegister' | 'Posting' | 'ProfileImage' | 'ProjectEdit' | 'ArticleEdit'

export type AuthTypes = {
  userName: string,
  token: string,
  expire: string,
  userId: string,
  carrots: number,
} | null
