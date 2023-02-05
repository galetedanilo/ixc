import { AbstractControl } from "@angular/forms";

export const getErrorMessage = (field: AbstractControl<any | any> | null) => {
  if (field?.hasError('required')) {
    return 'Campo obrigatório';
  }

  if (field?.hasError('minlength')) {
    const requiredLength = field.errors
      ? field.errors['minlength']['requiredLength']
      : 5;
    return `Tamanho mínimo precisa ser de ${requiredLength} caracteres`;
  }

  if (field?.hasError('maxlength')) {
    const requiredLength = field.errors
      ? field.errors['maxlength']['requiredLength']
      : 40;
    return `Tamanho máximo precisa ser de ${requiredLength} caracteres`;
  }

  if (field?.hasError('email')) {
    return 'Digite um e-mail valido';
  }

  if (field?.hasError('match')) {
    return 'As senhas não são iguais';
  }

  if (field?.hasError('pattern')) {
    return 'Senha deve possuir numeros e maiusculo';
  }

  return '';
}