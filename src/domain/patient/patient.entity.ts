export class Patient {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly phone: string,
    public readonly birthDate: Date,
  ) {}
}
